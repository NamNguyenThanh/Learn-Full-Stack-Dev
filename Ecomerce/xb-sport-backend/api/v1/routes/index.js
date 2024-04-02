'use strict';
const express = require('express');
const router = express.Router();

// router.use('/product', require('./product'));
router.use('/shop', require('./shop'));

module.exports = router;
