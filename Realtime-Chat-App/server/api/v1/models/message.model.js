'use strict';
const mongoose = require('mongoose');
const connection = require('../databases/init.mongodb');

const messageSchema = new mongoose.Schema(
  {
    from_user: {
      type: String,
      required: true,
    },
    to_user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = connection.model('Messages', messageSchema);
