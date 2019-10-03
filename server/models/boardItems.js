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

module.exports = boardItemsModel;
