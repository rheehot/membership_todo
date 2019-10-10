const pool = require('./db');
const { authModel } = require('../models/auth');
const convertTime = require('../utils/convertTime');


/**
 * 유저 시퀀스로 해당 유저의 권한 조회
 *
 * @param {number} userSeq
 * @return {array} auths
 */
const getAuthbyUser = async (userSeq) => {
  const sql = 'SELECT * FROM AUTH WHERE user_seq = ?';
  const [rows] = await pool.execute(sql, [userSeq]);

  return rows.length === 0 ? null : await authModel(rows[0]);
};

/**
 * 보드 시퀀스로 해당 보드의 권한 조회
 *
 * @param {number} boardrSeq
 * @return {array} auths
 */
const getAuthbyBoard = async (boardSeq) => {
  const sql = 'SELECT * FROM AUTH WHERE board_seq = ?';
  const [rows] = await pool.execute(sql, [boardSeq]);

  return rows.length === 0 ? null : await authModel(rows[0]);
};

/**
 * 권한 생성

 * @param {object} auth json
 * @return {array} auths
 */
const createAuth = async (_auth) => {
  const { userSeq, boardSeq, auth } = _auth;

  const sql1 = 'INSERT INTO AUTH (user_seq, board_seq, auth ) VALUES (?,?,?);';
  await pool.execute(sql1, [userSeq, boardSeq, auth]);

  return await getAuthbyUser(userSeq);
};

/**
 * 권한 수정
 *
 * @param {object} auth
 * @return {array} auths
 */
const modifyAuth = async (_auth) => {
  const { userSeq, boardSeq, auth } = _auth;
  const queries = {};

  if (userSeq !== undefined) {
    // queries.push(`user_seq= '${userSeq}'`);
    queries[user_seq] = userSeq;
  }
  if (boardSeq !== undefined) {
    // queries.push(`board_seq='${boardSeq}'`);
    queries[board_seq] = boardSeq;
  }
  if (auth !== undefined) {
    // queries.push(`auth='${auth}'`);
    queries[auth] = auth;
  }

  queries.push(`update_date='${convertTime()}'`);

  const sql = 'UPDATE AUTH SET ? WHERE ?;';
  await pool.execute(sql, queries);

  return await getAuthbyUser(userSeq);
};


/**
 * 권한 삭제
 *
 * @param {number} seq
 * @return {object} info
 */
const deleteAuth = async (_auth) => {
  const { userSeq, boardSeq } = _auth;
  const sql1 = `DELETE FROM AUTH WHERE board_seq = ${boardSeq} AND user_seq = ${userSeq};`;
  const [rows] = await pool.execute(sql1);
  return rows;
};

module.exports = { getAuthbyUser, getAuthbyBoard, createAuth, modifyAuth, deleteAuth };
