'use strict';
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const shopModel = require('../models/shop.model');
const KeyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError, InternalServerError, AuthFailureError } = require('../core/error.response');
const { findByEmail } = require('./shop.service');

const roleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    // Step 1: Check email in dbs
    const shop = await findByEmail({ email });
    if (!shop) {
      throw new BadRequestError('[ERROR]: Shop not registered');
    }
    // Step 2: Match password
    const match = bcrypt.compare(password, shop.password);
    if (!match) {
      throw new AuthFailureError('[ERROR]: Authentication error');
    }
    // Step 3: Create AT vs RT and save
    // const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    //   modulusLength: 4096,
    //   publicKeyEncoding: {
    //     type: 'pkcs1',
    //     format: 'pem',
    //   },
    //   privateKeyEncoding: {
    //     type: 'pkcs1',
    //     format: 'pem',
    //   },
    // });
    const publicKey = crypto.randomBytes(32).toString('hex');
    const privateKey = crypto.randomBytes(32).toString('hex');
    // Step 4: Generate tokens
    // Create token pair
    const tokens = await createTokenPair({ userId: shop._id, email }, publicKey, privateKey);
    if (!tokens) {
      throw InternalServerError('[ERROR] Creating token pair failed.');
    }

    // Save KeyToken
    await KeyTokenService.createKeyToken({
      userId: shop._id,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    // Step 5: Get data return login
    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email'],
        object: shop,
      }),
      tokens,
    };
  };

  static logout = async ({ keyToken }) => {
    console.log('Enter Logout');
    return await KeyTokenService.removeKeyById(keyToken._id);
  };

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
    // const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    //   modulusLength: 4096,
    //   publicKeyEncoding: {
    //     type: 'pkcs1',
    //     format: 'pem',
    //   },
    //   privateKeyEncoding: {
    //     type: 'pkcs1',
    //     format: 'pem',
    //   },
    // });
    const publicKey = crypto.randomBytes(32).toString('hex');
    const privateKey = crypto.randomBytes(32).toString('hex');

    // Create token pair
    const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);
    if (!tokens) {
      throw InternalServerError('[ERROR] Creating token pair failed.');
    }

    // Save KeyToken
    await KeyTokenService.createKeyToken({
      userId: newShop._id,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

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
