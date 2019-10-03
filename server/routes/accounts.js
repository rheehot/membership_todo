const express = require('express');

const router = express.Router();
const db = require('../database/users');
const passport = require('../middlewares/passport-local');

router.get('/islogin', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(204).end();
  } else {
    res.status(200).json(req.session.passport.user);
  }
});

// 로그아웃
/**
 * @api {get} /api/users/logout Logout
 * @apiName Logout
 * @apiGroup Accounts
 */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({});
});

// 회원가입 - 유저 등록
/**
 * @api {post} /api/accounts/signup
 * @apiName CreateUser
 * @apiGroup Accounts
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 * {
 *     "id": "user1",
 *     "pw": "qwerty",
 *     "name": "aer4ee",
 *     "birth": "1567601355922",
 *     "gender": "female",
 *     "email": "email@gmail.com",
 *     "phone": "01012345678",
 *     "favorite": "a,b,c",
 *      "auth" : "user"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 */
router.post('/signup', async (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) next(err);
    if (!user) res.status(401).json(info);
    else {
      req.logIn(user, (e) => {
        if (e) return next(e);
        res.status(200).end();
      });
    }
  })(req, res, next);
});

// 로그인 - 유저 체크
/**
 * @api {post} /api/accounts/login Check User
 * @apiName Login
 * @apiGroup Accounts
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 * {
 *     "id": "user1",
 *     "pw": "qwerty",
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404
 * HTTP/1.1 401
 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) next(err);
    if (!user) res.status(401).json(info);
    else {
      req.logIn(user, (e) => {
        if (e) return next(e);
        res.status(200).end();
      });
    }
  })(req, res, next);
});

// 유저 조회 (아이디 중복체크)
/**
 * @api {get} /api/accounts/:id Id Check
 * @apiName Check Id
 * @apiGroup Accounts
 *
 * @apiParam (path) {String} userId
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * @apiErrorExample Error-Response:
 * HTTP/1.1 204 No Content
 */
router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = await db.getUserById(userId);
    if (!result) {
      res.status(200).end();
    } else {
      res.status(204).end();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
