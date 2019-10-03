const parseTime = require('../utils/parseTime');

const fileModel = (result) => ({
  seq: result.seq,
  itemSeq: result.item_seq,
  url: result.url,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
});

module.exports = fileModel;
