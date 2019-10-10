const pool = require('./db');
const fileModel = require('../models/file');
const convertTime = require('../utils/convertTime');


/**
 * 파일 시퀀스로 조회
 *
 * @param {number} fileSeq
 * @return {object} file
 */
const getFile = async (fileSeq) => {
  const sql = 'SELECT * FROM FILE WHERE seq = ?';
  const [rows] = await pool.execute(sql, [fileSeq]);

  return rows.length === 0 ? null : await fileModel(rows[0]);
};

/**
 * 아이템 시퀀스로 파일 조회
 *
 * @param {number} itemSeq
 * @return {array} files
 */
const getItemFiles = async (itemSeq) => {
  const sql = 'SELECT * FROM FILE WHERE item_seq = ?';
  const [rows] = await pool.execute(sql, [itemSeq]);

  if (rows.length === 0) return null;
  const result = rows.map((row) => fileModel(row));
  return await result;
};

/**
 * 파일 생성

 * @param {object} file json
 * @return {object} file
 */
const createFile = async (itemSeq, files) => {
  for (const url of files) {
    const sql1 = 'INSERT INTO FILE (item_seq, url) VALUES (?,?);';
    await pool.execute(sql1, [itemSeq, url]);
  }

  const sql2 = 'SELECT LAST_INSERT_ID() AS seq;';
  const [rows] = await pool.execute(sql2);

  const { seq } = rows[0];
  return await getFile(seq);
};

/**
 * 파일 수정
 *
 * @param {number, object} seq, file
 * @return {object} file
 */
const modifyFile = async (seq, file) => {
  const { itemSeq, url } = file;
  const queries = {};

  if (itemSeq !== undefined) {
    queries[item_seq] = itemSeq;
  }
  if (url !== undefined) {
    queries[url] = url;
  }
  queries.push(`update_date='${convertTime()}'`);

  const sql = 'UPDATE FILE SET ? WHERE ?;';
  await pool.execute(sql, [queries, { seq }]);

  return await getFile(seq);
};


/**
 * 권한 삭제
 *
 * @param {number} seq
 * @return {object} info
 */
const deleteFile = async (seq) => {
  const sql1 = 'DELETE FROM FILE WHERE ?;';
  const [rows] = await pool.execute(sql1, { seq });
  return rows;
};

module.exports = { getFile, getItemFiles, createFile, modifyFile, deleteFile };
