'use strict';

const ProductService = require('../services/product.service');
const { CREATED, OK } = require('../core/success.response');

class ProductController {
  createProduct = async (req, res, next) => {
    new CREATED({
      message: 'Product created successfully',
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  updateProduct = async (req, res, next) => {
    new OK({
      message: 'Update product successfully',
      metadata: await ProductService.updateProduct(req.body.product_type, req.params.product_id, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  publicProductByShop = async (req, res, next) => {
    new OK({
      message: 'Public product successfully',
      metadata: await ProductService.publicProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  unPublicProductByShop = async (req, res, next) => {
    new OK({
      message: 'Unpublic product successfully',
      metadata: await ProductService.unPublicProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  //  QUERY
  getAllDraftsForShop = async (req, res, next) => {
    new OK({
      message: 'Get all drafts for shop successfully',
      metadata: await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllPublishForShop = async (req, res, next) => {
    new OK({
      message: 'Get all published for shop successfully',
      metadata: await ProductService.findAllPublishForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getListSearchProduct = async (req, res, next) => {
    new OK({
      message: 'Get list search product successfully',
      metadata: await ProductService.searchProducts(req.params),
    }).send(res);
  };

  getAllProducts = async (req, res, next) => {
    new OK({
      message: 'Get list search product successfully',
      metadata: await ProductService.findAllProducts(req.query),
    }).send(res);
  };

  getProduct = async (req, res, next) => {
    new OK({
      message: 'Get product successfully',
      metadata: await ProductService.findProduct({
        product_id: req.params.product_id,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
