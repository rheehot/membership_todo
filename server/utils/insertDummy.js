const { resetDB, createTable, resetTable } = require('../database/reset');
const { user, main, mini, mainItem, miniItem } = require('../database');

module.exports = async () => {
  try {
    await resetDB();
    await createTable();
    await resetTable();
    // 유저
    await user.createUser({
      userId: 'boostcamp',
      pw: 'Boostcamp123!',
      name: '부스트캠프',
      birth: '1999-03-28',
      gender: '여',
      email: 'boost@gmail.com',
      phone: '01012345677',
      favorite: '수영,댄스,요가',
      auth: 'admin',
    });

    await user.createUser({
      userId: 'boostcamp1',
      pw: 'Boostcamp1231!',
      name: '부스트캠프1',
      birth: '1999-03-28',
      gender: '여',
      email: 'boost@gmail.com',
      phone: '01012345677',
      favorite: '노래,게임',
    });
  } catch (err) {
    throw new Error(err);
  }
};
