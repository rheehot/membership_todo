const boardAuthModel = (result) => ({
  userSeq: result.user_seq,
  boardSeq: result.board_seq,
  auth: result.auth,
});

module.exports = boardAuthModel;
