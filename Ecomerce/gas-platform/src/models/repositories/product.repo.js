'use strict';

const { NotFoundError } = require('../../core/error.response');
const { product, cloth, electronic } = require('../../models/product.model');

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const findAllPublishForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const publicProductByShop = async ({ product_shop, product_id }) => {
  const filter = {
    product_shop: product_shop,
    _id: product_id,
  };

  const update = {
    isDraft: false,
    isPublished: true,
  };

  const options = {
    new: true,
  };

  return await product.findOneAndUpdate(filter, update, options);
};

const unPublicProductByShop = async ({ product_shop, product_id }) => {
  const filter = {
    product_shop: product_shop,
    _id: product_id,
  };

  const update = {
    isDraft: true,
    isPublished: false,
  };

  const options = {
    new: true,
  };

  return await product.findOneAndUpdate(filter, update, options);
};

module.exports = {
  findAllDraftsForShop,
  findAllPublishForShop,
  publicProductByShop,
  unPublicProductByShop,
};
