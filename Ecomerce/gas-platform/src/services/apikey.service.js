'use strict';

const crypto = require('node:crypto');
const apikeyModel = require('../models/apikey.model');
const { ForbiddenError } = require('../core/error.response');

class ApiKeyService {
  static findById = async (key) => {
    // const newKey = await apikeyModel.create({
    //   key: crypto.randomBytes(64).toString('hex'),
    //   permissions: ['0000'],
    // });
    const objKey = await apikeyModel.findOne({ key, status: true }).lean();
    if (!objKey) {
      throw new ForbiddenError();
    }
    return objKey;
  };
}

module.exports = ApiKeyService;
