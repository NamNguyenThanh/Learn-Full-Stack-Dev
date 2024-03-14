'use strict';

const { product, cloth, electronic } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');

// Use FActory Pattern
class ProductFactory {
  static async createProduct(product_type, payload) {
    switch (product_type) {
      case 'Cloth':
        return new Cloth(payload).createProduct();
      case 'Electronic':
        return new Electronic(payload).createProduct();
      default:
        throw new BadRequestError('Invalid product Types', product_type);
    }
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

module.exports = ProductFactory;
