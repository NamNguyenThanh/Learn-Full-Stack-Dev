'use strict';

const { product } = require('../../models/product.model');
const { getSelectData, getUnSelectData } = require('../../utils');

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

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
  return await product.find(filter).sort(sortBy).skip(skip).limit(limit).select(getSelectData(select)).lean();
};

const findProduct = async ({ product_id, unSelect }) => {
  return await product.findById(product_id).select(getUnSelectData(unSelect)).lean();
};

module.exports = {
  findAllDraftsForShop,
  findAllPublishForShop,
  publicProductByShop,
  unPublicProductByShop,
  searchProductByUser,
  findAllProducts,
  findProduct,
};
