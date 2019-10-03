const parseTime = require('../utils/parseTime');

const boardModel = (result) => ({
  seq: result.seq,
  userSeq: result.user_seq,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
  auth: result.auth,
  title: result.title,
});

const boardItemsModel = (result) => ({
  boardSeq: result.board_seq,
  colSeq: result.col_seq,
  colTitle: result.col_title,
  colOrder: result.col_order,
  itemSeq: result.item_seq,
  itemWriter: result.user_id,
  itemContent: result.content,
  itemOrder: result.item_order,
});

module.exports = { boardItemsModel, boardModel };
