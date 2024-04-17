'use strict';
const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Categories';
const DOCUMENT_NAME = 'Category';

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    path: { type: String, default: null },
    thumbnail: String,
    icon: String,
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);

categorySchema.index({ name: 1, path: 1 });

module.exports = model(DOCUMENT_NAME, categorySchema);
