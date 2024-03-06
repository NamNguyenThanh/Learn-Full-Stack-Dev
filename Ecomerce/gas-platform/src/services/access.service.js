'use strict';
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const shopModel = require('../models/shop.model');
const KeyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');

const roleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // Step 1: Check email exited
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: 'xxx',
          message: 'Email đã tồn tại',
          status: 'error',
        };
      }
      // Step 2: Create new shop
      const hashPassword = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashPassword,
        status: 'inactive',
        roles: [roleShop.SHOP],
      });
      if (!newShop) {
        return {
          code: 'xxx',
          message: 'Create shop error',
          status: 'error',
        };
      }
      // create publickey (for dev) and privatekey (for user)
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
      });

      // Save KeyToken
      const keyToken = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
      });
      if (!keyToken) {
        return {
          code: 'xxx',
          message: 'KeyTokenService.createKeyToken error',
          status: 'error',
        };
      }
      const publicKeyObject = crypto.createPublicKey(keyToken.publicKey);

      // Create token pair
      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);
      if (!tokens) {
        return {
          code: 'xxx',
          message: 'createTokenPair error',
          status: 'error',
        };
      }

      return {
        code: 'xxx',
        metadata: {
          shop: getInfoData({
            fields: ['_id', 'name', 'email'],
            object: newShop,
          }),
          tokens,
        },
        status: 'success',
      };
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}

module.exports = AccessService;
