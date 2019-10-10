const parseTime = require('../utils/parseTime');

const itemModel = (result) => ({
  seq: result.seq,
  colSeq: result.col_seq,
  userId: result.user_id,
  content: result.content,
  itemOrder: result.item_order,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
});

const itemFilesModel = (result) => ({
  seq: result.seq,
  colSeq: result.col_seq,
  userId: result.user_id,
  content: result.content,
  itemOrder: result.item_order,
  url: result.url,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
});

module.exports = { itemModel, itemFilesModel };
