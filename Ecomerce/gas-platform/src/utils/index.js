'use strict';

const _ = require('lodash');

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const asyncHandler = (asyncFunc) => {
  return (req, res, next) => {
    asyncFunc(req, res, next).catch(next);
  };
};

module.exports = {
  getInfoData,
  asyncHandler,
};
