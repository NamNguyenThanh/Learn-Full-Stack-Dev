'use strict';

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const { asyncHandler } = require('../helpers/asyncHandler');
const router = express.Router();

// check apiKey by using custom middleware
router.use(asyncHandler(apiKey));

// check permissions
router.use(permission('0000'));

router.use('/v1/api', require('./access'));

module.exports = router;
