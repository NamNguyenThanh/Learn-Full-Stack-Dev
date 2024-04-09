'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();

router.use('/apikey', require('./apikey'));
router.use('/shop', require('./shop'));
router.use('/category', require('./category'));
router.use('/product', require('./product'));
router.use('/public', express.static(path.join(__dirname, '../public')));
module.exports = router;
