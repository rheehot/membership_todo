const pool = require('./db');
const { itemModel, itemFilesModel } = require('../models/item');
const convertTime = require('../utils/convertTime');


/**
 * 아이템 시퀀스로 아이템 조회
 * 파일 조인으로 한번에 가져온다.
 *
 * @param {number} seq
 * @return {object} item
 */
const getItem = async (seq) => {
  const sql = `SELECT I.*, 
  F.seq as file_seq, F.url 
  FROM ITEM I
      LEFT OUTER JOIN FILE F ON I.seq = F.item_seq
  WHERE
      I.seq = ?`;
  const [rows] = await pool.execute(sql, [seq]);

  if (rows.length === 0) return null;

  const result = rows.map((row) => itemFilesModel(row));
  return await result;
};

/**
 * 아이템 생성

 * @param {object} item json
 * @return {object} item
 */
const createItem = async (item) => {
  const { colSeq, userId, content, itemOrder } = item;

  const sql1 = 'INSERT INTO ITEM (col_seq, user_id, content, item_order ) VALUES (?,?,?,?);';
  await pool.execute(sql1, [colSeq, userId, content, itemOrder]);

  const sql2 = 'SELECT LAST_INSERT_ID() AS seq;';
  const [rows] = await pool.execute(sql2);
  const { seq } = rows[0];

  // return await getItem(seq);
  return seq;
};

/**
 * 아이템 수정
 *
 * @param {number, object} seq, item
 * @return {object} item
 */
const modifyItem = async (seq, item) => {
  const { colSeq, userId, content, itemOrder } = item;
  const queries = [];

  if (colSeq !== undefined) {
    queries.push(`col_seq= '${colSeq}'`);
  }
  if (userId !== undefined) {
    queries.push(`used_id='${userId}'`);
  }
  if (content !== undefined) {
    queries.push(`content='${content}'`);
  }
  if (itemOrder !== undefined) {
    queries.push(`item_order='${itemOrder}'`);
  }

  queries.push(`update_date='${convertTime()}'`);

  const sql = `UPDATE ITEM SET ${queries.join(',')} WHERE ?;`;
  await pool.execute(sql, { seq });

  return await getItem(seq);
};

/**
 * 아이템 삭제
 *
 * @param {number} seq
 * @return {object} info
 */
const deleteItem = async (seq) => {
  const sql1 = 'DELETE FROM ITEM WHERE seq = ?;';
  const [rows] = await pool.execute(sql1, [seq]);
  return rows;
};

module.exports = { getItem, createItem, modifyItem, deleteItem };
