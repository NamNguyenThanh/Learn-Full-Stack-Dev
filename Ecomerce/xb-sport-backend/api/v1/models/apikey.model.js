'use strict';

const { model, Schema } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

// Declare the Schema of the Mongo model
var apiKeySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
    permissions: {
      type: [String],
      required: true,
      enum: [
        'create-apikey',
        'change-apikey',
        'access-shop',
        'create-shop',
        'change-shop',
        'create-product',
        'edit-product',
      ], // can use permission code here instead of role
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);
