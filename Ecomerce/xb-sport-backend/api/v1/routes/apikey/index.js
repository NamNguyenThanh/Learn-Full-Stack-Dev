'use strict';
const express = require('express');
const { asyncHandler } = require('../../helpers/async_handler');
const { apiKey, permission } = require('../../auth/auth_utils');
const ApiKeyController = require('../../controllers/apikey.controller');

const router = express.Router();
router.use(asyncHandler(apiKey));
router.post('', permission('create-apikey'), asyncHandler(ApiKeyController.createKey));

module.exports = router;
