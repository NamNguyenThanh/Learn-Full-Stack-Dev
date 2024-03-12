'use strict';

const JWT = require('jsonwebtoken');
const { InternalServerError, AuthFailureError, NotFoundError } = require('../core/error.response');
const { asyncHandler } = require('../helpers/asyncHandler');
const KeyTokenService = require('../services/keytoken.service');
const HEADER = {
  API_KEY: 'x-api-key',
  CLIEND_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'refresh-token',
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '1 days',
    });
    // refreshToken
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    });
    // Verify
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify::`, err);
      } else {
        console.log(`decoded verify::`, decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new InternalServerError('[ERROR] Create Access Token and Refresh Token failed.');
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  // Step 1: Check userId missing
  const userId = req.headers[HEADER.CLIEND_ID];
  if (!userId) throw new AuthFailureError('[ERROR] Invalid Request');

  // Step 2: Get accessToken
  const keyToken = await KeyTokenService.findByUserId(userId);
  if (!keyToken) throw new NotFoundError('[ERROR] Not found key store');

  // Step 3: Verify token
  const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
  if (refreshToken) {
    try {
      const decodeUser = JWT.verify(refreshToken, keyToken.privateKey);
      if (userId !== decodeUser.userId) throw new AuthFailureError('[ERROR] Invalid User ID');
      req.keyToken = keyToken;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError('[ERROR] Invalid Request');
  try {
    const decodeUser = JWT.verify(accessToken, keyToken.publicKey);
    if (userId !== decodeUser.userId) throw new AuthFailureError('[ERROR] Invalid User ID');
    req.keyToken = keyToken;
    // req.user = decodeUser;
    return next();
  } catch (error) {
    throw error;
  }
});

const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
};
