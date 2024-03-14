'use strict';

const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();
// Check authentication and set req.keyToken (get from db) if request is authenticated
router.use(authentication);

router.post('', asyncHandler(productController.createProduct));
module.exports = router;
