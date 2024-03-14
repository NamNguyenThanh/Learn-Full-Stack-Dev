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
  // END QUERY
}

module.exports = new ProductController();
