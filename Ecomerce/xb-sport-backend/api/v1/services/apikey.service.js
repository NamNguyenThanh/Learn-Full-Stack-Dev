'use strict';

const crypto = require('node:crypto');
const apiKeyModel = require('../models/apikey.model');
const { ForbiddenError } = require('../core/error.response');

class ApiKeyService {
  static createKey = async ({ name, permissions }) => {
    const newKey = await apiKeyModel.create({
      name,
      key: crypto.randomBytes(64).toString('hex'),
      permissions,
    });
    return newKey;
  };
  static findByKey = async (key) => {
    const objKey = await apiKeyModel.findOne({ key, status: 'active' }).lean();
    if (!objKey) throw new ForbiddenError();
    return objKey;
  };
}

module.exports = ApiKeyService;
