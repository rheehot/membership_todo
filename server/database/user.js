const pool = require('./db');
const userModel = require('../models/user');
const passwordHash = require('../utils/passwordHash');
const convertTime = require('../utils/convertTime');


/**
 * 모든 유저 조회
 *
 * @param {} no param
 * @return {object} user
 */
const getAllUsers = async () => {
  const sql = 'SELECT * FROM USER';
  const [rows] = await pool.execute(sql);

  if (rows.length === 0) return null;

  const result = rows.map((row) => userModel(row));
  return await result;
};

/**
 * 유저 넘버(id)로 유저 조회
 *
 * @param {number} id
 * @return {object} user
 */
const getUser = async (seq) => {
  const sql = `SELECT * FROM USER WHERE seq = ${seq}`;
  const [rows] = await pool.execute(sql);

  return rows.length === 0 ? null : await userModel(rows[0]);
};

/**
 * 유저 아이디(user_id)로 유저 조회
 *
 * @param {string} userId
 * @return {object} user
 */
const getUserById = async (userId) => {
  const sql = `SELECT * FROM USER WHERE user_id = '${userId}'`;
  const [rows] = await pool.execute(sql);

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

  const sql1 = `INSERT INTO USER (user_id, pw, name, birth, gender, email, phone, favorite, auth ) VALUES ('${userId}', '${passwordHash(pw)}', '${name}', '${birth}', '${gender}', '${email}', '${phone}', '${favorite}', '${auth}');`;

  await pool.execute(sql1);

  const sql2 = 'SELECT LAST_INSERT_ID() AS seq;';
  const [rows] = await pool.execute(sql2);

  const { seq } = rows[0];
  return await getUser(seq);
};

/**
 * 유저 정보 수정
 *
 * @param {number, object} id, user
 * @return {object} user
 */
const modifyUser = async (seq, user) => {
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

  const sql = `UPDATE USER SET ${queries.join(',')} WHERE seq = ${seq};`;
  await pool.execute(sql);

  return await getUser(seq);
};

/**
 * 유저 정보 삭제
 *
 * @param {number} id
 * @return {object} user
 */
const deleteUser = async (seq) => {
  const sql1 = `DELETE FROM USER WHERE seq = ${seq};`;
  const [rows] = await pool.execute(sql1);
  return rows;
};

module.exports = { createUser, getAllUsers, getUser, getUserById, modifyUser, deleteUser };
