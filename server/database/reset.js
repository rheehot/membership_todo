const pool = require('./db');

const resetTable = async () => {
  const user = 'ALTER TABLE user AUTO_INCREMENT = 1;';

  await pool.query(user);
};


module.exports = { resetTable };
