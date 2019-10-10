const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const passport = require('passport');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');

dotenv.config();

const admin = require('./server/routes/admin');
const accounts = require('./server/routes/accounts');
const board = require('./server/routes/board');
const column = require('./server/routes/column');
const item = require('./server/routes/item');
const todo = require('./server/routes/item');
const log = require('./server/routes/log');
const boardAuth = require('./server/routes/board-auth');

const app = express();
app.use(favicon(path.join(__dirname, 'server/public', 'favicon.ico')));

// 뷰엔진
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// 미들웨어
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'server/public'),
    dest: path.join(__dirname, 'server/public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  }),
);

// 세션
const client = redis.createClient({
  port: process.env.DB_REDIS_PORT,
  host: 'localhost',
  password: process.env.DB_USER_KEY,
});

const sessionMiddleWare = session({
  secret: 'boostcamp',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2000 * 60 * 60, // 지속시간 2시간
  },
  store: new RedisStore({
    client,
    ttl: 14 * 24 * 60 * 60,
  }),
});
app.use(sessionMiddleWare);

// passport 적용
app.use(passport.initialize());
app.use(passport.session());

// 플래시 메시지 관련
app.use(flash());

app.use((req, res, next) => {
  app.locals.isLogin = req.isAuthenticated();
  app.locals.userData = req.user;
  next();
});

// static
app.use(express.static(path.join(__dirname, './server/public')));

// routing
app.use('/', express.static('./client/build/'));
app.use('/api', express.static('./server/apidoc'));

app.use('/api/accounts', accounts);
app.use('/api/board', board);
app.use('/api/column', column);
app.use('/api/item', item);
app.use('/api/log', log);
app.use('/api/board-auth', boardAuth);
app.use('/admin', admin);

// error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const resetDB = require('./server/utils/insertDummy');

const server = app.listen(process.env.PORT || 3000, async () => {
  const port = server.address();
  console.log(`Express server listening on port  ${port.port}`);
  // await resetDB();
  // console.log('resetDB');
});

module.exports = app;
