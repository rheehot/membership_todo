const parseTime = require('../utils/parseTime');

const columnModel = (result) => ({
  seq: result.seq,
  boardSeq: result.board_seq,
  title: result.title,
  order: result.order,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
});

module.exports = columnModel;
