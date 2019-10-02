const pool = require('./db');

const resetDB = async () => {
  const sql1 = 'DROP database mydb;';
  const sql2 = 'CREATE database mydb /*!40100 DEFAULT CHARACTER SET utf8 */;';
  const sql3 = 'use mydb;';
  await pool.query(sql1);
  await pool.query(sql2);
  await pool.query(sql3);
};

const createTable = async () => {
  const user = `CREATE TABLE user (
    id int(11) NOT NULL AUTO_INCREMENT,
    user_id varchar(100) NOT NULL,
    pw varchar(100) NOT NULL,
    name varchar(255) NOT NULL,
    birth datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gender varchar(45) NOT NULL,
    email varchar(100) NOT NULL,
    phone varchar(100) NOT NULL,
    favorite varchar(255) NOT NULL,
    reg_date datetime DEFAULT CURRENT_TIMESTAMP,
    update_date datetime DEFAULT CURRENT_TIMESTAMP,
    auth varchar(45) DEFAULT 'user',
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    UNIQUE KEY user_id_UNIQUE (user_id),
    UNIQUE KEY pw_UNIQUE (pw)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
  ;`;

  await pool.query(user);
};

const resetTable = async () => {
  const user = 'ALTER TABLE user AUTO_INCREMENT = 1;';

  await pool.query(user);
};


module.exports = { resetDB, createTable, resetTable };
