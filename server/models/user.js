const parseTime = require('../utils/parseTime');

const userModel = (result) => ({
  seq: result.seq,
  userId: result.user_id,
  pw: result.pw,
  name: result.name,
  birth: result.birth,
  gender: result.gender,
  email: result.email,
  phone: result.phone,
  favorite: result.favorite,
  createDate: parseTime(result.create_date),
  updateDate: parseTime(result.update_date),
  auth: result.auth,
});

module.exports = userModel;
