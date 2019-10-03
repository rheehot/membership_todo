const express = require('express');

const router = express.Router();
const { mini, miniItem } = require('../../database');
const { upload, deleteFile } = require('../../middlewares/multer');

// 미니 캐러셀 아이템
// ***
// ***
// ***
// ***

// 미니 캐러셀 아이템 조회
/**
 * @api {get} /admin/carousel/main/item/:id view Items of Main card
 * @apiName ViewItemsOfMainCard
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} cardId
 * @apiSuccessExample Success-Response:
 * {
 *     "id":1,
 *     "title": "제목",
 *     "color": "#dddddd",
 *     "imageUrl": "http://example.com/a.png",
 * }
 */
router.get('/item/:carouselId', async (req, res, next) => {
  const { carouselId } = req.params;

  try {
    const carousel = await mini.getCarousel(carouselId);
    const result = await miniItem.getMiniCarouselItems(carouselId);
    res.render('admin/mini/items', { carousel, items: result });
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 아이템 삭제
/**
 * @api {delete} /admin/carousel/main/item/:itemId Delete Main Item
 * @apiName DeleteMainItem
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} itemId itemId.
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/item/:itemId', async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await miniItem.getMiniItem(itemId);
    await deleteFile(item.imageUrl);
    await miniItem.deleteMiniCarouselItem(itemId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 아이템 추가 폼 페이지 렌더
router.get('/item/edit/:carouselId', async (req, res, next) => {
  const { carouselId } = req.params;
  res.render('admin/mini/itemForm', { carouselId, item: {} });
});

// 미니 캐러셀 아이템 등록
/**
 * @api {post} /admin/carousel/main/item Create Main Item
 * @apiName CreateMainItem
 * @apiGroup Admin
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 * {
 *     "title": "제목",
 *     "color": "#dddddd",
 *     "imageUrl": "http://example.com/a.png",
 * }
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "id":1,
 *     "title": "제목",
 *     "color": "#dddddd",
 *     "imageUrl": "http://example.com/a.png",
 * }
 */
router.post('/item', upload.single('file'), async (req, res, next) => {
  const carouselId = req.body.miniCarouselId;
  req.body.imageUrl = !req.file ? '/images/default.png' : req.file.location;

  try {
    const result = await miniItem.createMiniCarouselItem(carouselId, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 아이템 수정 페이지 뷰
/**
 * @api {get} /admin/carousel/main/item/:itemId  view MainItem
 * @apiName ViewMainItem
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} itemId
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "id":1,
 *     "title": "제목",
 *     "color": "#dddddd",
 *     "imageUrl": "http://example.com/a.png",
 * }
 */
router.get('/item/edit/:carouselId/:itemId', async (req, res, next) => {
  const { carouselId, itemId } = req.params;
  try {
    const result = await miniItem.getMiniItem(itemId);
    res.render('admin/mini/itemForm', { carouselId, item: result });
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 아이템 정보 수정
/**
 * @api {put} /admin/carousel/main/item/:itemId  Modify Main Item
 * @apiName ModifyMainItem
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} itemId
 * @apiParam {Json} body
 * @apiParamExample {json} User Action:
 * {
 *     "title": "제목",
 *     "color": "#dddddd",
 *     "imageUrl": "http://example.com/a.png",
 * }
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "id":1,
 *     "title": "제목",
 *     "color": "#dddddd",
 *     "imageUrl": "http://example.com/a.png",
 * }
 */
router.put('/item/:itemId', upload.single('file'), async (req, res, next) => {
  const { itemId } = req.params;
  req.body.imageUrl = !req.file ? undefined : req.file.location;

  try {
    await miniItem.modifyMiniCarouselItem(itemId, req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀
// ***
// ***
// ***
// ***
// 미니 캐러셀 조회
/**
 * @api {get} /admin/carousel/mini View carousel
 * @apiName ViewMiniCarousel
 * @apiGroup Admin
 *
 *
 * @apiSuccessExample Success-Response:
 * [
 *  {
 *     "id":1,
 *     "title": "제목",
 *     "body": "content",
 *     "tail": "tail content",
 *  },
 * ]
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await mini.getAllCarousels();
    res.render('admin/mini', { minis: result });
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 추가 폼 페이지 렌더
router.get('/edit', async (req, res, next) => {
  res.render('admin/mini/form', { carousel: {} });
});

// 미니 캐러셀 등록
/**
 * @api {post} /admin/carousel/mini Create carousel
 * @apiName CreateMiniCarousel
 * @apiGroup Admin
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 * {
 *     "title": "제목",
 *     "body": "content",
 *     "tail": "tail content",
 * }
 * }
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "id":1,
 *     "title": "제목",
 *     "body": "content",
 *     "tail": "tail content",
 * }
 */
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const result = await mini.createCarousel(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 수정 페이지 뷰
/**
 * @api {get} /admin/carousel/main/:cardId  view Card
 * @apiName ViewMainCard
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} cardId
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "id":1,
 *     "title": "제목",
 *     "color": "#dddddd",
 *     "imageUrl": "http://example.com/a.png",
 * }
 */
router.get('/edit/:carouselId', async (req, res, next) => {
  const { carouselId } = req.params;
  try {
    const result = await mini.getCarousel(carouselId);
    res.render('admin/mini/form', { carousel: result });
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 정보 수정
/**
 * @api {put} /admin/carousel/mini/:carouselId  Modify carousel
 * @apiName ModifyMiniCarousel
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} carouselId
 * @apiParam {Json} body
 * @apiParamExample {json} User Action:
 * {
 *     "title": "제목",
 *     "body": "content",
 *     "tail": "tail content",
 * }
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "id":1,
 *     "title": "제목",
 *     "body": "content",
 *     "tail": "tail content",
 * }
 */
router.put('/:carouselId', upload.single('file'), async (req, res, next) => {
  const { carouselId } = req.params;

  try {
    await mini.modifyCarousel(carouselId, req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

// 미니 캐러셀 삭제
/**
 * @api {delete} /admin/carousel/mini/:carouselId Delete carousel
 * @apiName DeleteMiniCarousel
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} carouselId carouselId.
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/:carouselId', async (req, res, next) => {
  const { carouselId } = req.params;
  try {
    await mini.deleteCarousel(carouselId);
    // TODO item image도 버킷에서지워지게

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
