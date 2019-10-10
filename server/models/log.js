const parseTime = require('../utils/parseTime');

const logModel = (result) => ({
  seq: result.seq,
  boardSeq: result.board_seq,
  content: result.content,
  userId: result.user_id,
  createDate: parseTime(result.create_date),
});

module.exports = logModel;
