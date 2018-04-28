const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/request', require('./request'));


module.exports = router;
