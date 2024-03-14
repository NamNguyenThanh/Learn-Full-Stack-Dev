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
  return await product.findOneAndUpdate(
    { product_shop: product_shop, _id: product_id },
    { isDraft: false, isPublished: true },
    { new: true },
  );
};

const unPublicProductByShop = async ({ product_shop, product_id }) => {
  return await product.findOneAndUpdate(
    { product_shop: product_shop, _id: product_id },
    { isDraft: true, isPublished: false },
    { new: true },
  );
};

const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  return await product
    .find({ isPublished: true, $text: { $search: regexSearch } }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .lean();
};

module.exports = {
  findAllDraftsForShop,
  findAllPublishForShop,
  publicProductByShop,
  unPublicProductByShop,
  searchProductByUser,
};
