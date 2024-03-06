'use strict';

const { findById } = require('../services/apikey.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
  // middle ware apiKey
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Forbidden Error',
      });
    }
    // check objKey
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Forbidden Error',
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log(error);
  }
};

const permission = (permission) => {
  // closure function: tra ve 1 ham, ma ham do co the su dung cac bien cua cha
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Permission denied',
      });
    }
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Permission denied',
      });
    }
    return next();
  };
};

module.exports = {
  apiKey,
  permission,
};
