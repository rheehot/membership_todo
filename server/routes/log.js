const express = require('express');

const router = express.Router();
const { log } = require('../database');

// 전체 로그 정보 가져오기
/**
 * @api {get} /api/log Get Board Logs
 * @apiName GetBoardLogs
 * @apiGroup Log
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      seq:1,
 *      board_seq:1,
 *      content:'aaa',
 *      userId: 'boost',
 *      createDate:'2018-10-11',
 *  },
 * ]
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await log.getBoardLogs();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

// 로그 생성
/**
 * @api {post} /api/log
 * @apiName CreateLog
 * @apiGroup Log
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 *  {
 *      board_seq:1,
 *      content:'aaa',
 *      userId: 'boost',
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      seq:1,
 *      board_seq:1,
 *      content:'aaa',
 *      userId: 'boost',
 *       createDate:'2018-10-11',
 *  }
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await log.createLog(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 로그 삭제
/**
 * @api {delete} /api/log Delete Log
 * @apiName DeleteLog
 * @apiGroup Log
 *
 * @apiParam (path) {Number} logSeq
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/:logSeq', async (req, res, next) => {
  const { logSeq } = req.params;
  try {
    await log.deleteLog(logSeq);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
