'use strict';

const JWT = require('jsonwebtoken');
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days',
    });
    // refreshToken
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
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
    console.log(`error createTokenPair::`, error);
    return error;
  }
};

module.exports = {
  createTokenPair,
};
