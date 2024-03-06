'use strict';

const keyTokenModel = require('../models/keytoken.model');
const { InternalServerError } = require('../core/error.response');

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    const publicKeyString = publicKey.toString();
    const keyToken = await keyTokenModel.create({
      user: userId,
      publicKey: publicKeyString,
    });
    if (!keyToken) {
      throw new InternalServerError('[ERROR]: Create Key Token failed.');
    }
    return keyToken;
  };
}

module.exports = KeyTokenService;
