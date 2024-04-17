'use strict';
const express = require('express');
const { asyncHandler } = require('../../helpers/async_handler');
const AttributeController = require('../../controllers/attribute.controller');
const { authentication, apiKey, permission } = require('../../auth/auth_utils');

const router = express.Router();
router.use(asyncHandler(apiKey));
router.use(permission('access-shop'));
// Check authentication and set req.keyToken (get from db) if request is authenticated
router.use(authentication);
router.post('/create', asyncHandler(AttributeController.create));

module.exports = router;
