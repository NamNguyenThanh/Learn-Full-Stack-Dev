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

const cleanObject = (object) => {
  // Remove Null and Undefined values
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      cleanObject(v);
    }
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined) {
      if (Array.isArray(object)) {
        object.splice(k, 1);
      } else {
        delete object[k];
      }
    }
  });
  return object;
};

const updateNestedObject = (object) => {
  // convert {a1: {b1: {c1: 1}, b2: 2}, a2:3} to {a1.b1.c1: 1, a1.b2: 2, a2: 3}
  const final = {};
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      const response = updateNestedObject(object[key]);
      Object.keys(response).forEach((k) => {
        final[`${key}.${k}`] = response[k];
      });
    } else {
      final[key] = object[key];
    }
  });
  return final;
};

const updateNestedObjectV2 = (obj, parent, result = {}) => {
  // convert {a1: {b1: {c1: 1}, b2: 2}, a2:3} to {a1.b1.c1: 1, a1.b2: 2, a2: 3}
  Object.keys(obj).forEach((k) => {
    const propName = parent ? `${parent}.${k}` : k;
    if (typeof obj[k] == 'object' && !Array.isArray(obj[k])) {
      updateNestedObjectParser(obj[k], propName, result);
    } else {
      result[propName] = obj[k];
    }
  });
  return result;
};

module.exports = {
  getInfoData,
  getSelectData,
  getUnSelectData,
  cleanObject,
  updateNestedObject,
  updateNestedObjectV2,
};
