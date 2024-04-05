'use strict';
const express = require('express');
const router = express.Router();

router.use('/product', require('./product'));
router.use('/shop', require('./shop'));
router.use('/apikey', require('./apikey'));

module.exports = router;
