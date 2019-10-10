const express = require('express');

const router = express.Router();
const { auth } = require('../database');

// 유저 시퀀스로 유저가 권한 있는 보드 조회
/**
 * @api {get} /api/auth/user/:userSeq Get user's boards
 * @apiName GetUserBoards
 * @apiGroup Auth
 *
 * @apiSuccessExample {array} Success:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      userSeq:1,
 *      boardSeq:1,
 *      auth:'read',
 *  },
 * ]
 */
router.get('/user/:userSeq', async (req, res, next) => {
  const { userSeq } = req.params;

  try {
    const result = await auth.getAuthbyUser(userSeq);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

// 보드 시퀀스로 권한 가진 모든 유저 조회
/**
 * @api {get} /api/auth/board/:boardSeq Get board's users
 * @apiName GetBoardUsers
 * @apiGroup Auth
 *
 * @apiSuccessExample {array} Success:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      userSeq:1,
 *      boardSeq:1,
 *      auth:'read',
 *  },
 * ]
 */
router.get('/board/:boardSeq', async (req, res, next) => {
  const { boardSeq } = req.params;

  try {
    const result = await auth.getAuthbyBoard(boardSeq);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

// 권한 생성
/**
 * @api {post} /api/auth
 * @apiName CreateAuth
 * @apiGroup Auth
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 *  {
 *   userSeq: 1,
 *   boardSeq: 1,
 *   auth: 'read'
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  {
 *   userSeq: 1,
 *   boardSeq: 1,
 *   auth: 'read'
 *  }
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await auth.createAuth(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 권한 수정
/**
 * @api {pug} /api/auth
 * @apiName modifyauth
 * @apiGroup Auth
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 *  {
 *   userSeq: 1,
 *   boardSeq: 1,
 *   auth: 'read'
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  {
 *   userSeq: 1,
 *   boardSeq: 1,
 *   auth: 'read'
 *  }
 */
router.put('/', async (req, res, next) => {
  try {
    const result = await auth.modifyAuthBoard(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 권한 삭제
/**
 * @api {delete} /api/auth Delete Auth
 * @apiName DeleteAuth
 * @apiGroup Auth
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 *  {
 *   userSeq: 1,
 *   boardSeq: 1,
 *  }
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/', async (req, res, next) => {
  try {
    await auth.deleteAuth(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
