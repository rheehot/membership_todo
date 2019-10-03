const parseTime = require('../utils/parseTime');

const boardModel = (result) => ({
  seq: result.seq,
  userSeq: result.user_seq,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
  auth: result.auth,
  title: result.title,
});

module.exports = boardModel;
