'use strict';
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const shopModel = require('../models/shop.model');
const KeyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../auth/auth_utils');
const { BadRequestError, InternalServerError, AuthFailureError, ForbiddenError } = require('../core/error.response');
const { getInfoData } = require('../utils');

class ShopService {
  static signUp = async (params) => {
    const { email, password } = params;
    // Step 1: Check email exited
    const existShop = await shopModel.findOne({ email }).lean();
    if (existShop) {
      throw new BadRequestError('[ERROR]: Shop already registered');
    }
    // Step 2: Create new shop
    const hashPassword = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      ...params,
      password: hashPassword,
    });
    if (!newShop) {
      throw new InternalServerError('[ERROR]: Create Shop failed.');
    }
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
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email', 'phone', 'address', 'working_time', 'map_url'],
        object: newShop,
      }),
      tokens,
    };
  };

  static login = async ({ email, password }) => {
    // Step 1: Check email in dbs
    const shop = await ShopService.findByEmail({ email });
    if (!shop) {
      throw new BadRequestError('[ERROR]: Shop not registered');
    }
    // Step 2: Match password
    console.log('pass', password, 'shop pass', shop.password);
    const match = await bcrypt.compare(password, shop.password);
    if (!match) {
      throw new AuthFailureError('[ERROR]: Authentication error');
    }
    // Step 3: Create AT vs RT and save
    const publicKey = crypto.randomBytes(32).toString('hex');
    const privateKey = crypto.randomBytes(32).toString('hex');
    // Step 4: Generate tokens
    const tokens = await createTokenPair({ userId: shop._id, email }, publicKey, privateKey);
    if (!tokens) {
      throw InternalServerError('[ERROR] Creating token pair failed.');
    }

    // Save KeyToken
    await KeyTokenService.createKeyToken({
      userId: shop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    // Step 5: Get data return login
    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email', 'phone', 'address', 'working_time', 'map_url'],
        object: shop,
      }),
      tokens,
    };
  };

  static logout = async ({ keyToken }) => {
    return await KeyTokenService.removeKeyById(keyToken._id);
  };

  static handleRefreshToken = async ({ refreshToken, user, keyToken }) => {
    const { userId, email } = user;
    if (keyToken.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError('Something wrong happened. Please relogin!');
    }
    if (keyToken.refreshToken !== refreshToken) {
      throw new AuthFailureError('Shop not registered!');
    }
    const foundShop = await ShopService.findByEmail({ email });
    if (!foundShop) {
      throw new AuthFailureError('Shop not registered!');
    }
    // Create new pair token
    const tokens = await createTokenPair({ userId, email }, keyToken.publicKey, keyToken.privateKey);
    // Update token
    await KeyTokenService.findByRefreshTokenAndUpdate(
      { refreshToken },
      {
        $set: {
          refreshToken: tokens.refreshToken,
        },
        $addToSet: {
          refreshTokensUsed: refreshToken,
        },
      },
    );
    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email', 'phone', 'address', 'working_time', 'map_url'],
        object: foundShop,
      }),
      tokens,
    };
  };

  static findByEmail = async ({ email }) => {
    return await shopModel.findOne({ email }).lean();
  };
}

module.exports = ShopService;
