const parseTime = require('../utils/parseTime');

const logModel = (result) => ({
  seq: result.seq,
  boardSeq: result.board_seq,
  content: result.content,
  createDate: parseTime(result.create_date),
});

module.exports = logModel;
