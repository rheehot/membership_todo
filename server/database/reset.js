const pool = require('./db');

const resetTable = async () => {
  const sql = 'use todo;';

  const user = 'DELETE FROM USER; ALTER TABLE USER AUTO_INCREMENT = 1;';
  const board = 'DELETE FROM BOARD; ALTER TABLE BOARD AUTO_INCREMENT = 1;';
  const col = 'DELETE FROM COL; ALTER TABLE COL AUTO_INCREMENT = 1;';
  const item = 'DELETE FROM ITEM; ALTER TABLE ITEM AUTO_INCREMENT = 1;';
  const file = 'DELETE FROM FILE; ALTER TABLE FILE AUTO_INCREMENT = 1;';
  const log = 'DELETE FROM LOG; ALTER TABLE LOG AUTO_INCREMENT = 1;';
  const auth = 'DELETE FROM AUTH; ALTER TABLE AUTH AUTO_INCREMENT = 1;';

  await pool.query(sql);
  await pool.query(user);
  await pool.query(board);
  await pool.query(col);
  await pool.query(item);
  await pool.query(file);
  await pool.query(log);
  await pool.query(auth);
};


module.exports = { resetTable };
