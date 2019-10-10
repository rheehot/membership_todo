const pool = require('./db');
const logModel = require('../models/log');
const convertTime = require('../utils/convertTime');


/**
 * 로그 시퀀스로 로그 조회
 *
 * @param {number} seq
 * @return {object} log
 */
const getLog = async (seq) => {
  const sql = 'SELECT * FROM LOG WHERE seq=?';
  const [rows] = await pool.execute(sql, [seq]);

  return rows.length === 0 ? null : await logModel(rows[0]);
};

/**
 * 보드 시퀀스로 모든 로그 조회
 *
 * @param {number} boardSeq
 * @return {array} logs
 */
const getBoardLogs = async (boardSeq) => {
  const sql = 'SELECT * FROM LOG WHERE board_seq = ?';
  const [rows] = await pool.execute(sql, [boardSeq]);

  if (rows.length === 0) return null;

  const result = rows.map((row) => logModel(row));
  return await result;
};

/**
 * 로그 생성
 *
 * @param {object} log
 * @return {object} log
 */
const createLog = async (log) => {
  const { boardSeq, content, userId } = log;

  const sql1 = 'INSERT INTO LOG (board_seq, content, user_id ) VALUES (?,?,?);';
  await pool.execute(sql1, [boardSeq, content, userId]);

  const sql2 = 'SELECT LAST_INSERT_ID() AS seq;';
  const [rows] = await pool.execute(sql2);
  const { seq } = rows[0];
  return await getLog(seq);
};

/**
 * 로그 삭제
 *
 * @param {number} seq
 * @return {object} info
 */
const deleteLog = async (seq) => {
  const sql1 = 'DELETE FROM LOG WHERE ?;';
  const [rows] = await pool.execute(sql1, { seq });
  return rows;
};

module.exports = { getLog, getBoardLogs, createLog, deleteLog };
