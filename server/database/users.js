const pool = require('./db');
const userModel = require('../models/users');
const passwordHash = require('../utils/passwordHash');
const convertTime = require('../utils/convertTime');


/**
 * 모든 유저 조회
 *
 * @param {} no param
 * @return {object} user
 */
const getAllUsers = async () => {
  const sql = 'SELECT * FROM user';
  const [rows] = await pool.query(sql);

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
const getUser = async (id) => {
  const sql = `SELECT * FROM user WHERE id = ${id}`;
  const [rows] = await pool.query(sql);

  return rows.length === 0 ? null : await userModel(rows[0]);
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
