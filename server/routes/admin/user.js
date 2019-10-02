const express = require('express');

const router = express.Router();
const { user } = require('../../database');

// 모든 유저 조회
/**
 * @api {get} /admin/auth/
 * @apiName getAllUsers
 * @apiGroup Admin
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * [
 *  {
 *     "id": "user1",
 *     "pw": "qwerty",
 *     "name": "aer4ee",
 *     "birth": "1567601355922",
 *     "gender": "female",
 *     "email": "email@gmail.com",
 *     "phone": "01012345678",
 *     "favorite": "a,b,c",
 *  },
 * ]
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 204 No Content
 *
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await user.getAllUsers();
    res.render('admin/auth', { users: result });
  } catch (err) {
    next(err);
  }
});

// 특정 유저 상세 조회
/**
 * @api {get} /admin/auth/:id
 * @apiName getUser
 * @apiGroup Admin
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 *  {
 *     "id": "user1",
 *     "pw": "qwerty",
 *     "name": "aer4ee",
 *     "birth": "1567601355922",
 *     "gender": "female",
 *     "email": "email@gmail.com",
 *     "phone": "01012345678",
 *     "favorite": "a,b,c",
 *  }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 204 No Content
 *
 */
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await user.getUser(id);
    res.render('admin/auth/detail', { user: result });
  } catch (err) {
    next(err);
  }
});

// 유저 권한 수정
/**
 * @api {put} /admin/auth/:id Authority
 * @apiName UserAuthority
 * @apiGroup Admin
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 * {
 *    "auth": "admin",
 * }
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 204 No Content
 *
 */
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await user.modifyUser(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
