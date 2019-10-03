const express = require('express');

const router = express.Router();
const { main, mainItem } = require('../../database');
const { upload, deleteFile } = require('../../middlewares/multer');

// 메인 캐러셀 아이템
// ***
// ***
// ***
// ***

// 메인 캐러셀 아이템 조회
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
router.get('/item/:cardId', async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await main.getCard(cardId);
    const result = await mainItem.getCardItems(cardId);
    res.render('admin/main/items', { card, items: result });
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 아이템 삭제
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
    const item = await mainItem.getItem(itemId);
    await deleteFile(item.imageUrl);
    await mainItem.deleteCarouselItem(itemId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 아이템 추가 폼 페이지 렌더
router.get('/item/edit/:cardId', async (req, res, next) => {
  const { cardId } = req.params;
  res.render('admin/main/itemForm', { cardId, item: {} });
});

// 메인 캐러셀 아이템 등록
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
  const cardId = req.body.mainCarouselId;
  req.body.imageUrl = !req.file ? '/images/default.png' : req.file.location;

  try {
    const result = await mainItem.createCarouselItem(cardId, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 아이템 수정 페이지 뷰
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
router.get('/item/edit/:cardId/:itemId', async (req, res, next) => {
  const { cardId, itemId } = req.params;
  try {
    const result = await mainItem.getItem(itemId);
    res.render('admin/main/itemForm', { cardId, item: result });
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 아이템 정보 수정
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
    await mainItem.modifyCarouselItem(itemId, req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀
// ***
// ***
// ***
// ***

// 메인 캐러셀 조회
/**
 * @api {get} /admin/carousel/main view Main cards
 * @apiName ViewMainCards
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
router.get('/', async (req, res, next) => {
  try {
    const result = await main.getAllCards();
    res.render('admin/main', { cards: result });
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 카드 추가 폼 페이지 렌더
router.get('/edit', async (req, res, next) => {
  res.render('admin/main/form', { card: {} });
});

// 메인 캐러셀 카드 등록
/**
 * @api {post} /admin/carousel/main Create Card
 * @apiName CreateMainCard
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
router.post('/', upload.single('file'), async (req, res, next) => {
  const { title } = req.body;
  const color = req.body.color || '#ddd';
  const imageUrl = !req.file ? '/images/default.png' : req.file.location;

  try {
    const result = await main.createCard({
      title,
      color,
      imageUrl,
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 카드 수정 페이지 뷰
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
router.get('/edit/:cardId', async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const result = await main.getCard(cardId);
    res.render('admin/main/form', { card: result });
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 카드 정보 수정
/**
 * @api {put} /admin/carousel/main/:cardId  Modify Card
 * @apiName ModifyMainCard
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} cardId
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
router.put('/:cardId', upload.single('file'), async (req, res, next) => {
  const { cardId } = req.params;
  req.body.imageUrl = !req.file ? undefined : req.file.location;

  try {
    await main.modifyCard(cardId, req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

// 메인 캐러셀 카드 삭제
/**
 * @api {delete} /admin/carousel/main/:cardId Delete card
 * @apiName DeleteMainCard
 * @apiGroup Admin
 *
 * @apiParam (path) {Number} cardId cardId.
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/:cardId', async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await main.getCard(cardId);
    await deleteFile(card.imageUrl);
    // TODO item image도 버킷에서지워지게

    await main.deleteCard(cardId);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
