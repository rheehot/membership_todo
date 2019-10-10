const express = require('express');

const router = express.Router();
const { column } = require('../database');

// 컬럼 생성
/**
 * @api {post} /api/column
 * @apiName CreateColumn
 * @apiGroup Column
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 *  {
 *   boardSeq: 1,
 *   title: 'todo'
 *   order: 1
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  {
 *   seq: 1,
 *   boardSeq: 1,
 *   title: 'todo'
 *   order: 1,
 *   createDate:'2018-8-1',
 *   updateDate:'2018-8-1',
 *  }
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await column.createColumn(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 컬럼 수정
/**
 * @api {put} /api/column/:colSeq
 * @apiName modifyColumn
 * @apiGroup Column
 *
 * @apiParam (path) {Number} colSeq
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 *  {
 *   boardSeq: 1,
 *   title: 'todo1'
 *   order: 1
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  {
 *   seq: 1,
 *   boardSeq: 1,
 *   title: 'todo1'
 *   order: 1,
 *   createDate:'2018-8-1',
 *   updateDate:'2018-8-1',
 *  }
 */
router.put('/:colSeq', async (req, res, next) => {
  const { colSeq } = req.params;
  try {
    const result = await column.modifyColumn(colSeq, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 컬럼 삭제
/**
 * @api {delete} /api/column/:colSeq Delete Board
 * @apiName DeleteColumn
 * @apiGroup Column
 *
 * @apiParam (path) {Number} colSeq
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/:colSeq', async (req, res, next) => {
  const { colSeq } = req.params;
  try {
    await column.deleteColumn(colSeq);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
