const express = require('express');

const router = express.Router();
const { item, file } = require('../database');

const { upload, deleteFile } = reauire('../middlewares/multer');

// 아이템 가져오기
/**
 * @api {get} /api/item Get todo item
 * @apiName GetItem
 * @apiGroup Item
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      seq:1,
 *      colSeq:1,
 *      userId:'ttt',
 *      content:'aaa',
 *      order:1,
 *      url:'aaa.com',
 *      createDate:'2018-04-1',
 *      updateDate:'2018-04-1'
 *  },
 * ]
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await item.getItem();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

// 아이템 생성
/**
 * @api {post} /api/item
 * @apiName CreateItem
 * @apiGroup Item
 *
 * @apiParam {formData} body body.
 * @apiParamExample {json} User Action:
 * {
 *      colSeq:1,
 *      userId:'ttt',
 *      content:'aaa',
 *      order:1,
 *      file: 'file'
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  {
 *   seq: 1,
 *   userSeq: 1,
 *   createDate:'2018-8-1',
 *   updateDate:'2018-8-1',
 *   auth: 'public'
 *   title: 'todo'
 *  },
 */
router.post('/', upload.array('file'), async (req, res, next) => {
  const urls = req.files.map((f) => f.location);
  try {
    const result = await board.createBoard(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 보드 수정
/**
 * @api {pug} /api/board
 * @apiName modifyBoard
 * @apiGroup Board
 *
 * @apiParam (path) {Number} boardSeq
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 *  {
 *   userSeq: 1,
 *   auth: 'public'
 *   title: 'todo'
 *  },
 *
 * @apiSuccessExample Success-Response:
 *  {
 *   seq: 1,
 *   userSeq: 1,
 *   createDate:'2018-8-1',
 *   updateDate:'2018-8-1',
 *   auth: 'public'
 *   title: 'todo'
 *  },
 */
router.put('/:boardSeq', async (req, res, next) => {
  const { boardSeq } = req.params;
  try {
    const result = await board.modifyBoard(boardSeq, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 보드 삭제
/**
 * @api {delete} /api/board Delete Board
 * @apiName DeleteBoard
 * @apiGroup Board
 *
 * @apiParam (path) {Number} BoardSeq
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/:boardSeq', async (req, res, next) => {
  const { boardSeq } = req.params;
  try {
    await board.deleteBoard(boardSeq);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
