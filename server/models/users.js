const parseTime = require('../utils/parseTime');

const userModel = (result) => ({
  id: result.id,
  userId: result.user_id,
  pw: result.pw,
  name: result.name,
  birth: result.birth,
  gender: result.gender,
  email: result.email,
  phone: result.phone,
  favorite: result.favorite,
  regDate: parseTime(result.reg_date),
  updateDate: parseTime(result.update_date),
  auth: result.auth,
});

module.exports = userModel;
