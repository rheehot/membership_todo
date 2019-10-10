const express = require('express');

const router = express.Router();
const adminRequired = require('../../middlewares/adminRequired');

router.use(adminRequired);
router.use('/auth', require('./user'));

module.exports = router;
