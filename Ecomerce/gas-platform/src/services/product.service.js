'use strict';

const { product, cloth, electronic } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
const {
  findAllDraftsForShop,
  findAllPublishForShop,
  publicProductByShop,
  unPublicProductByShop,
  searchProductByUser,
} = require('../models/repositories/product.repo');

// Use FActory Pattern
class ProductFactory {
  static productRegistry = {}; // key-class
  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }
  static async createProduct(product_type, payload) {
    const productClass = ProductFactory.productRegistry[product_type];
    if (!productClass) throw new BadRequestError('Invalid product Types', product_type);
    return new productClass(payload).createProduct();
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
}

// Register new product class
ProductFactory.registerProductType('Cloth', Cloth);
ProductFactory.registerProductType('Electronic', Electronic);

module.exports = ProductFactory;
