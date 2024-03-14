'use strict';
const keyTokenModel = require('../models/keytoken.model');
const { InternalServerError } = require('../core/error.response');

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    const filter = { user: userId };
    const update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken };
    const options = { upsert: true, new: true };

    const keyToken = await keyTokenModel.findOneAndUpdate(filter, update, options);
    if (!keyToken) {
      throw new InternalServerError('[ERROR]: Create Key Token failed.');
    }
    return keyToken;
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: userId }).lean();
  };

  static removeKeyById = async (id) => {
    return await keyTokenModel.deleteMany(id);
  };

  static findByRefreshTokensUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken });
  };

  static findByRefreshTokenAndUpdate = async (filter, update) => {
    return await keyTokenModel.findOneAndUpdate(filter, update);
  };

  static deleteKeyById = async (userId) => {
    return await keyTokenModel.deleteOne({ user: userId });
  };
}

module.exports = KeyTokenService;
