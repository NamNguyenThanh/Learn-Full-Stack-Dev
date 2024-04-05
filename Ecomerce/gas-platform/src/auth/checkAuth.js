'use strict';

const { ForbiddenError } = require('../core/error.response');
const ApiKeyService = require('../services/apikey.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
  // middle ware apiKey
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) {
    throw new ForbiddenError();
  }
  // check objKey
  const objKey = await ApiKeyService.findById(key);
  req.objKey = objKey;
  return next();
};

const permission = (permission) => {
  // closure function: tra ve 1 ham, ma ham do co the su dung cac bien cua cha
  return (req, res, next) => {
    if (!req.objKey) throw new ForbiddenError();

    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) throw new ForbiddenError();

    return next();
  };
};

module.exports = {
  apiKey,
  permission,
};
