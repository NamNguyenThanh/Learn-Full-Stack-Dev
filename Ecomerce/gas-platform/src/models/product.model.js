'use strict';

const { Schema, model } = require('mongoose'); // Erase if already required
const slugify = require('slugify');

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

var productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String },
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ['Electronic', 'Cloth'] },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, required: true },
    product_rating_average: {
      type: Number,
      default: 5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true },
    isPublished: { type: Boolean, default: false, index: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);
// Create index for search
productSchema.index({ product_name: 'text', product_description: 'text' });

// Document middleware: runs before .save() and .create() ...
productSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

const clothSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    collection: 'Clothes',
    timestamps: true,
  },
);

const electronicSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    collection: 'Electronics',
    timestamps: true,
  },
);

module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  cloth: model('Cloth', clothSchema),
  electronic: model('Electronic', electronicSchema),
};
