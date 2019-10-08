const pool = require('./db');
const { boardModel, boardItemsModel } = require('../models/board');
const convertTime = require('../utils/convertTime');

/**
 * 보드 시퀀스로 보드 조회
 * 보드의 컬럼과 아이템 한번에 가져온다.
 *
 * @param {number} seq
 * @return {array} board items
 */
const getBoardItems = async (seq) => {
  const sql = `SELECT B.seq as board_seq, 
  C.seq as col_seq, C.title as col_title, C.order as col_order, 
  I.seq as item_seq, I.user_id, I.content, I.order as item_order
  FROM BOARD B
    LEFT OUTER JOIN COL C ON B.seq = C.board_seq
    LEFT OUTER JOIN ITEM I ON C.seq = I.col_seq
  WHERE
    B.seq = ?`;

  const [rows] = await pool.execute(sql, [seq]);

  const result = rows.map((row) => boardItemsModel(row));
  return await result;
};

/**
 * 유저의 모든 보드 조회
 * 유저가 소유한 보드(프로젝트) 목록에 사용한다.
 *
 * @param {userSeq} user seq
 * @return {array} boards
 */
const getBoardsByUser = async (userSeq) => {
  const sql = 'SELECT * FROM BOARD where user_seq =?';
  const [rows] = await pool.execute(sql, [userSeq]);

  if (rows.length === 0) return null;

  const result = rows.map((row) => boardModel(row));
  return await result;
};

/**
 * 보드 생성
 * 보드를 생성할때 디폴트 컬럼 3개가 생성된다.
 * 생성한 보드를 반환한다. (TODO: 생성하고 바로 보드를 확인 하지 않으면 필요 없음)
 *
 * @param {object} board json
 * @return {object} board items
 */
const createBoard = async (board) => {
  const { userSeq, title } = board;
  const auth = !board.auth ? 'public' : board.auth;

  const sql1 = 'INSERT INTO BOARD (user_seq, title, auth ) VALUES (?,?,?);';

  await pool.execute(sql1, [userSeq, title, auth]);

  const sql2 = 'SELECT LAST_INSERT_ID() AS seq;';
  const [rows] = await pool.execute(sql2);

  const { seq } = rows[0];
  return await getBoardItems(seq);
};

/**
 * 보드 정보 수정
 *
 * @param {number, object} seq, board
 * @return {object} board items
 */
const modifyBoard = async (seq, board) => {
  const { userSeq, title, auth } = board;
  const queries = [];

  if (userSeq !== undefined) {
    queries.push(`user_seq= '${userSeq}'`);
  }
  if (title !== undefined) {
    queries.push(`title='${title}'`);
  }
  if (auth !== undefined) {
    queries.push(`auth='${auth}'`);
  }
  queries.push(`update_date='${convertTime()}'`);

  const sql = `UPDATE BOARD SET ${queries.join(',')} WHERE seq = ${seq};`;
  await pool.execute(sql);

  return await getBoardItems(seq);
};

/**
 * 보드 정보 삭제
 *
 * @param {number} seq
 * @return {object} info
 */
const deleteBoard = async (seq) => {
  const sql1 = `DELETE FROM BOARD WHERE seq = ${seq};`;
  const [rows] = await pool.execute(sql1);
  return rows;
};

module.exports = { getBoardItems, getBoardsByUser, createBoard, modifyBoard, deleteBoard };
