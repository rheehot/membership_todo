const pool = require('./db');
const columnModel = require('../models/column');
const convertTime = require('../utils/convertTime');


/**
 * 컬럼 시퀀스로 컬럼 조회
 *
 * @param {number} seq
 * @return {object} column
 */
const getColumn = async (seq) => {
  const sql = `SELECT * FROM COL WHERE seq = ${seq}`;
  const [rows] = await pool.query(sql);

  return rows.length === 0 ? null : await columnModel(rows[0]);
};

/**
 * 컬럼 생성
 *
 * @param {object} column json
 * @return {object} column
 */
const createColumn = async (column) => {
  const { boardSeq, title, order } = column;

  const sql1 = `INSERT INTO COL (board_seq, title, order ) VALUES ('${boardSeq}', '${title}', '${order}');`;

  await pool.query(sql1);

  const sql2 = 'SELECT LAST_INSERT_ID() AS seq;';
  const [rows] = await pool.query(sql2);

  const { seq } = rows[0];
  return await getColumn(seq);
};

/**
 * 컬럼 수정
 *
 * @param {number, object} seq, column
 * @return {object} column
 */
const modifyColumn = async (seq, column) => {
  const { boardSeq, title, order } = column;
  const queries = [];

  if (boardSeq !== undefined) {
    queries.push(`board_seq= '${boardSeq}'`);
  }
  if (title !== undefined) {
    queries.push(`title='${title}'`);
  }
  if (order !== undefined) {
    queries.push(`order='${order}'`);
  }

  queries.push(`update_date='${convertTime()}'`);

  const sql = `UPDATE COL SET ${queries.join(',')} WHERE seq = ${seq};`;
  await pool.query(sql);

  return await getColumn(seq);
};

/**
 * 컬럼 정보 삭제
 *
 * @param {number} seq
 * @return {object} info
 */
const deleteColumn = async (seq) => {
  const sql1 = `DELETE FROM COL WHERE seq = ${seq};`;
  const [rows] = await pool.query(sql1);
  return rows;
};

module.exports = { getColumn, createColumn, deleteColumn, modifyColumn };
