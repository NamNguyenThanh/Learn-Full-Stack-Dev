'use strict';

const keyTokenModel = require('../models/keytoken.model');

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const keyToken = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return keyToken;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
