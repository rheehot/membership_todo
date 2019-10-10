const express = require('express');

const router = express.Router();
const { board } = require('../database');

// 보드 전체 정보 가져오기
/**
 * @api {get} /api/board Get Board Contents
 * @apiName GetBoardContents
 * @apiGroup Board
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      board_seq:1,
 *      col_seq:1,
 *      col_title:'ttt',
 *      col_order:1,
 *      item_seq:1,
 *      user_id:1,
 *      content:'sss',
 *      item_order:1
 *  },
 * ]
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await board.getBoardItems();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

// 유저의 모든 보드 조회
/**
 * @api {get} /api/board/
 * @apiName GetUsersBoards
 * @apiGroup Board
 *
 * @apiParam (path) {number} userSeq
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * [
 *  {
 *   seq: 1,
 *   userSeq: 1,
 *   createDate:'2018-8-1',
 *   updateDate:'2018-8-1',
 *   auth: 'public'
 *   title: 'todo'
 *  },
 * ]
 */
router.get('/:userSeq', async (req, res, next) => {
  try {
    const { userSeq } = req.params;
    const result = await board.getBoardsByUser(userSeq);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 보드 생성
/**
 * @api {post} /api/board
 * @apiName CreateBoard
 * @apiGroup Board
 *
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
router.post('/', async (req, res, next) => {
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
    const result = await board.createBoard(boardSeq, req.body);
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
