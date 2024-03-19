'use strict';

const { product, cloth, electronic } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
const {
  findAllDraftsForShop,
  findAllPublishForShop,
  publicProductByShop,
  unPublicProductByShop,
  searchProductByUser,
  findAllProducts,
  findProduct,
  updateProductById,
} = require('../models/repositories/product.repo');
const { cleanObject, updateNestedObject } = require('../utils');

// Use FActory Pattern
class ProductFactory {
  static productRegistry = {}; // key-class
  static registerProductType(product_type, classRef) {
    ProductFactory.productRegistry[product_type] = classRef;
  }
  static async createProduct(product_type, payload) {
    const productClass = ProductFactory.productRegistry[product_type];
    if (!productClass) throw new BadRequestError('Invalid product Types', product_type);
    return new productClass(payload).createProduct();
  }

  static async updateProduct(product_type, product_id, payload) {
    const productClass = ProductFactory.productRegistry[product_type];
    if (!productClass) throw new BadRequestError('Invalid product Types', product_type);
    return new productClass(payload).updateProduct(product_id);
  }

  // QUERY
  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await findAllDraftsForShop({ query, limit, skip });
  }

  static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true };
    return await findAllPublishForShop({ query, limit, skip });
  }

  static async searchProducts({ keySearch }) {
    return await searchProductByUser({ keySearch });
  }

  static async findAllProducts({
    limit = 50,
    sort = 'ctime',
    page = 1,
    filter = { isPublished: true },
    select = ['product_name', 'product_price', 'product_thumb'],
  }) {
    return await findAllProducts({ limit, sort, page, filter, select });
  }

  static async findProduct({ product_id, unSelect = ['__v'] }) {
    return await findProduct({ product_id, unSelect });
  }

  // PUT
  static async publicProductByShop({ product_shop, product_id }) {
    return await publicProductByShop({ product_shop, product_id });
  }

  static async unPublicProductByShop({ product_shop, product_id }) {
    return await unPublicProductByShop({ product_shop, product_id });
  }
}

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id });
  }

  async updateProduct(product_id, payload) {
    return await updateProductById({ model: product, product_id, payload });
  }
}

class Cloth extends Product {
  async createProduct() {
    const newCloth = await cloth.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newCloth) throw new BadRequestError('Create new Cloth failed');

    const newProduct = await super.createProduct(newCloth._id);
    if (!newProduct) throw new BadRequestError('Create new Product failed');

    return newProduct;
  }

  async updateProduct(product_id) {
    // Step 1: Remove attributes has null/undifined
    const payload = cleanObject(this);
    // Step 2: Check and update
    if (payload.product_attributes) {
      // Update Child Attributes
      await updateProductById({ model: cloth, product_id, payload: updateNestedObject(payload.product_attributes) });
    }
    // Update Parent
    const updatedProduct = await super.updateProduct(product_id, updateNestedObject(payload));
    return updatedProduct;
  }
}

class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic) throw new BadRequestError('Create new Electronic failed');

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError('Create new Product failed');

    return newProduct;
  }

  async updateProduct(product_id) {
    // Step 1: Remove attributes has null/undifined
    const payload = cleanObject(this);
    // Step 2: Check and update
    if (payload.product_attributes) {
      // Update Child Attributes
      await updateProductById({
        model: electronic,
        product_id,
        payload: updateNestedObject(payload.product_attributes),
      });
    }
    // Update Parent
    const updatedProduct = await super.updateProduct(product_id, updateNestedObject(payload));
    return updatedProduct;
  }
}

// Register new product class
ProductFactory.registerProductType('Cloth', Cloth);
ProductFactory.registerProductType('Electronic', Electronic);

module.exports = ProductFactory;
