'use strict';
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const shopModel = require('../models/shop.model');
const KeyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError, InternalServerError } = require('../core/error.response');

const roleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    // Step 1: Check email exited
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError('[ERROR]: Shop already registered');
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
      throw new InternalServerError('[ERROR]: Create Shop failed.');
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
    const publicKeyObject = crypto.createPublicKey(keyToken.publicKey);

    // Create token pair
    const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);
    if (!tokens) {
      throw InternalServerError('[ERROR] Creating token pair failed.');
    }

    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email'],
        object: newShop,
      }),
      tokens,
    };
  };
}

module.exports = AccessService;
