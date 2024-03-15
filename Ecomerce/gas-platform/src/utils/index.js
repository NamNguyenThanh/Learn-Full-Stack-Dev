'use strict';

const _ = require('lodash');

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const getSelectData = (select = []) => {
  // ['a', 'b', 'c] => { a: 1, b: 1, c: 1 }
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const getUnSelectData = (unselect = []) => {
  // ['a', 'b', 'c] => { a: 0, b: 0, c: 0 }
  return Object.fromEntries(unselect.map((el) => [el, 0]));
};

module.exports = {
  getInfoData,
  getSelectData,
  getUnSelectData,
};
