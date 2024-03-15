'use strict';

const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct));
router.get('', asyncHandler(productController.getAllProducts));
router.get('/:product_id', asyncHandler(productController.getProduct));

// Check authentication and set req.keyToken (get from db) if request is authenticated
router.use(authentication);

router.post('', asyncHandler(productController.createProduct));
router.post('/public/:id', asyncHandler(productController.publicProductByShop));
router.post('/unpublic/:id', asyncHandler(productController.unPublicProductByShop));

// QUERY
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop));
router.get('/published/all', asyncHandler(productController.getAllPublishForShop));

module.exports = router;
