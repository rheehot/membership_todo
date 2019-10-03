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
      I.seq = ${seq}`;
  const [rows] = await pool.query(sql);

  if (rows.length === 0) return null;

  const result = rows.map((row) => itemFilesModel(row));
  return await result;
};


module.exports = { getItem };
