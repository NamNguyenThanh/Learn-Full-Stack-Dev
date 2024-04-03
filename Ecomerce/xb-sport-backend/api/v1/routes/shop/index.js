'use strict';
const express = require('express');
const { asyncHandler } = require('../../helpers/async_handler');
const shopController = require('../../controllers/shop.controller');
const { authentication, apiKey, permission } = require('../../auth/auth_utils');

const router = express.Router();
router.use(asyncHandler(apiKey));
router.use(permission('access-shop'));
router.post('/signup', asyncHandler(shopController.signUp));
router.post('/login', asyncHandler(shopController.login));

// Check authentication and set req.keyToken (get from db) if request is authenticated
router.use(authentication);
router.post('/logout', asyncHandler(shopController.logout));
router.post('/handleRefreshToken', asyncHandler(shopController.handleRefreshToken));

module.exports = router;
