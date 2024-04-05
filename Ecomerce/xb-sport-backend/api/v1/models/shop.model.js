'use strict';
const { model, Schema } = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'Shops';
const DOCUMENT_NAME = 'Shop';

var shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    address: {
      province: { type: String, trim: true },
      district: { type: String, trim: true },
      ward: { type: String, trim: true },
      street: { type: String, trim: true },
    },
    working_time: {
      start: String,
      end: String,
    },
    map_url: String,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);
