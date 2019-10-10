const boardAuthModel = (result) => ({
  userSeq: result.user_seq,
  boardSeq: result.board_seq,
  boardAuth: result.board_auth,
});

module.exports = boardAuthModel;
