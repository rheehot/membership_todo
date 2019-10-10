const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../utils/passwordHash');
const { createUser, getUserById } = require('../database/user');

passport.serializeUser((user, done) => {
  //   console.log('ser', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  //   console.log('des', user);
  done(null, user);
});

// 회원가입
passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'pw',
      session: true,
      passReqToCallback: true,
    },
    async (req, userId, pw, done) => {
      try {
        const result = await createUser(req.body);
        const user = {
          name: result.name,
          auth: result.auth,
          favorite: result.favorite,
          create_time: new Date(),
        };
        return done(null, user);
      } catch (err) {
        return done(null, false, {
          message: err,
        });
      }
    },
  ),
);

// 로그인
passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'pw',
      session: true,
      passReqToCallback: true,
    },
    async (req, userId, pw, done) => {
      const result = await getUserById(userId);

      if (!result) {
        return done(null, false, {
          message: '일치하는 아이디 패스워드가 존재하지 않습니다.',
        });
      }
      if (result.pw !== passwordHash(pw)) {
        return done(null, false, {
          message: '패스워드가 일치하지 않습니다.',
        });
      }

      const user = {
        name: result.name,
        auth: result.auth,
        favorite: result.favorite,
        create_time: new Date(),
      };

      return done(null, user);
    },
  ),
);

module.exports = passport;
