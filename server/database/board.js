const pool = require('./db');
const boardModel = require('../models/board');
const convertTime = require('../utils/convertTime');

/**
 * 보드 시퀀스로 보드 조회
 * 보드의 컬럼과 아이템 한번에 가져온다.
 *
 * @param {number} seq
 * @return {object} board
 */
const getBoard = async (seq) => {
  const sql = `SELECT * FROM user WHERE id = ${id}`;
  `SELECT BOARD.seq, COL.*, ITEM.*
  FROM BOARD
      LEFT OUTER JOIN TB_CUST C ON O.CUST_NO = COL.CUST_NO
      LEFT OUTER JOIN TB_PRODUCT P ON O.PRODUCT_NO = P.PRODUCT_NO
  WHERE
      C.CUST_NAME = 'MIKE'
  [출처] [MSSQL] 3개 이상 테이블 조인|작성자 똑똑이`;
  const [rows] = await pool.query(sql);

  return rows.length === 0 ? null : await userModel(rows[0]);
};

/**
 * 유저의 모든 보드 조회
 * 유저가 소유한 보드(프로젝트) 목록에 사용한다.
 *
 * @param {userSeq} user seq
 * @return {array} boards
 */
const getAllBoards = async (userSeq) => {
  const sql = `SELECT * FROM BOARD where user_seq = ${userSeq}`;
  const [rows] = await pool.query(sql);

  if (rows.length === 0) return null;

  const result = rows.map((row) => boardModel(row));
  return await result;
};

/**
 * 유저 아이디(user_id)로 유저 조회
 *
 * @param {string} userId
 * @return {object} user
 */
const getUserById = async (userId) => {
  const sql = `SELECT * FROM user WHERE user_id = '${userId}'`;
  const [rows] = await pool.query(sql);

  return rows.length === 0 ? null : await userModel(rows[0]);
};

/**
 * 유저데이터 삽입, 해당 유저 반환
 *
 * @param {object} user json
 * @return {object} user
 */
const createUser = async (user) => {
  const { userId, pw, name, birth, gender, email, phone, favorite } = user;
  const auth = !user.auth ? 'user' : user.auth;

  const sql1 = `INSERT INTO user (user_id, pw, name, birth, gender, email, phone, favorite, auth ) VALUES ('${userId}', '${passwordHash(pw)}', '${name}', '${birth}', '${gender}', '${email}', '${phone}', '${favorite}', '${auth}');`;

  await pool.query(sql1);

  const sql2 = 'SELECT LAST_INSERT_ID() AS id;';
  const [rows] = await pool.query(sql2);

  const { id } = rows[0];
  return await getUser(id);
};

/**
 * 유저 정보 수정
 *
 * @param {number, object} id, user
 * @return {object} user
 */
const modifyUser = async (seqId, user) => {
  const { userId, pw, name, birth, gender, email, phone, favorite, auth } = user;
  const queries = [];

  if (userId !== undefined) {
    queries.push(`user_id= '${userId}'`);
  }
  if (pw !== undefined) {
    queries.push(`pw='${passwordHash(pw)}'`);
  }
  if (name !== undefined) {
    queries.push(`name='${name}'`);
  }
  if (birth !== undefined) {
    queries.push(`birth='${birth}'`);
  }
  if (gender !== undefined) {
    queries.push(`gender='${gender}'`);
  }
  if (email !== undefined) {
    queries.push(`email='${email}'`);
  }
  if (phone !== undefined) {
    queries.push(`phone='${phone}'`);
  }
  if (favorite !== undefined) {
    queries.push(`favorite='${favorite}'`);
  }
  if (auth !== undefined) {
    queries.push(`auth='${auth}'`);
  }
  queries.push(`update_date='${convertTime()}'`);

  const sql = `UPDATE user SET ${queries.join(',')} WHERE id = ${seqId};`;
  await pool.query(sql);

  return await getUser(seqId);
};

/**
 * 유저 정보 삭제
 *
 * @param {number} id
 * @return {object} user
 */
const deleteUser = async (id) => {
  const sql1 = `DELETE FROM user WHERE id = ${id};`;
  const [rows] = await pool.query(sql1);
  return rows;
};

module.exports = { createUser, getAllUsers, getUser, getUserById, modifyUser, deleteUser };
