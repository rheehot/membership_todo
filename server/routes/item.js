const express = require('express');

const router = express.Router();
const { item, file } = require('../database');

const { upload, deleteStorage } = reauire('../middlewares/multer');

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
 * @apiSuccessExample {json} Success:
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
router.post('/', upload.array('file'), async (req, res, next) => {
  const { colSeq, userId, content, order } = req.body;
  const urls = req.files.length > 0 ? req.files.map((f) => f.location) : false;

  try {
    const resertSeq = await item.createItem({ colSeq, userId, content, order });
    if (urls) await file.createFile(resertSeq, urls);

    const result = await item.getItem(resultSeq);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 아이템 수정
/**
 * @api {put} /api/item
 * @apiName modifyItem
 * @apiGroup Item
 *
 * @apiParam (path) {Number} itemSeq
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
 * @apiSuccessExample {json} Success:
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
router.put('/:itemSeq', upload.array('file'), async (req, res, next) => {
  const { itemSeq } = req.params;
  const { colSeq, userId, content, order } = req.body;
  const urls = req.files.length > 0 ? req.files.map((f) => f.location) : false;

  try {
    // 기존의 파일과 스토리지 데이터를 삭제한다.
    const files = await file.getItemFiles(itemSeq);
    for (const f of files) {
      await deleteStorage(f.url);
      await deleteFile(f.seq);
    }
    // 파일을 새로 생성한다.
    if (urls) await file.createFile(itemSeq, urls);
    const result = await item.modifyItem(itemSeq, {
      colSeq,
      userId,
      content,
      order,
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 아이템 삭제
/**
 * @api {delete} /api/item Delete Board
 * @apiName DeleteItem
 * @apiGroup Item
 *
 * @apiParam (path) {Number} itemSeq
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/:itemSeq', async (req, res, next) => {
  const { itemSeq } = req.params;
  try {
    const files = await file.getItemFiles(itemSeq);
    for (const f of files) {
      await deleteStorage(f.url);
    }

    await item.deleteItem(itemSeq);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
