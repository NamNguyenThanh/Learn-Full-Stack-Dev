'use strict';

const keyTokenModel = require('../models/keytoken.model');
const { InternalServerError } = require('../core/error.response');

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
    const filter = { user: userId };
    const update = { publicKey, refreshTokensUsed: [], refreshToken };
    const options = { upsert: true, new: true };

    const keyToken = await keyTokenModel.findOneAndUpdate(filter, update, options);
    if (!keyToken) {
      throw new InternalServerError('[ERROR]: Create Key Token failed.');
    }
    return keyToken;
  };
}

module.exports = KeyTokenService;
