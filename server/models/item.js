const parseTime = require('../utils/parseTime');

const itemModel = (result) => ({
  seq: result.seq,
  colSeq: result.col_seq,
  userId: result.user_id,
  content: result.content,
  order: result.order,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
});

module.exports = itemModel;
