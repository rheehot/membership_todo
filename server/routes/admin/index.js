const express = require('express');

const router = express.Router();
const adminRequired = require('../../middlewares/adminRequired');

router.use(adminRequired);

router.use('/carousel/main', require('./main'));
router.use('/carousel/mini', require('./mini'));
router.use('/auth', require('./user'));

module.exports = router;
