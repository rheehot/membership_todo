const { resetTable } = require('../database/reset');
const { user, board, column, item, file, auth, log } = require('../database');

module.exports = async () => {
  try {
    await resetTable();

    // 유저
    await user.createUser({
      userId: 'admin',
      pw: 'admin',
      name: '조애리',
      birth: '1999-03-28',
      gender: '여',
      email: 'boost@gmail.com',
      phone: '01012345677',
      favorite: '코딩',
      auth: 'admin',
    });

    await user.createUser({
      userId: 'boostcamp1',
      pw: 'boostcamp1',
      name: '박상은',
      birth: '1999-03-28',
      gender: '여',
      email: 'boost@gmail.com',
      phone: '01012345677',
      favorite: '노래,게임',
    });

    await user.createUser({
      userId: 'boostcamp2',
      pw: 'boostcamp2',
      name: '김세진',
      birth: '1999-03-28',
      gender: '남',
      email: 'boost@gmail.com',
      phone: '01012345677',
      favorite: '농구',
    });

    await user.createUser({
      userId: 'boostcamp3',
      pw: 'boostcamp3',
      name: '권기웅',
      birth: '1999-03-28',
      gender: '남',
      email: 'boost@gmail.com',
      phone: '01012345677',
      favorite: '축구',
    });

    // 보드
    await board.createBoard({
      userSeq: 1,
      title: '조애리의 할일',
    });
    await board.createBoard({
      userSeq: 1,
      title: '조애리의 비밀 할일',
      auth: 'private',
    });
    await board.createBoard({
      userSeq: 2,
      title: '박상은의 할일',
    });
    await board.createBoard({
      userSeq: 2,
      title: '박상은의 비밀 할일',
      auth: 'private',
    });
    await board.createBoard({
      userSeq: 3,
      title: '김세진의 할일',
    });

    // 컬럼
    await column.createColumn({
      boardSeq: 1,
      title: '컬럼컬럼',
      colOrder: 3,
    });

    // 아이템
    await item.createItem({
      colSeq: 1,
      userId: 'admin',
      content: '코딩하기',
      itemOrder: 0,
    });
    await item.createItem({
      colSeq: 2,
      userId: 'admin',
      content: '술마시기',
      itemOrder: 0,
    });

    // 로그
    await log.createLog({
      boardSeq: 1,
      userId: 'admin',
      content: "add '코딩하기' to 'todo",
    });

    // 권한
    await auth.createAuth({
      boardSeq: 2,
      userSeq: 2,
      boardAuth: 'write',
    });
  } catch (err) {
    throw new Error(err);
  }
};
