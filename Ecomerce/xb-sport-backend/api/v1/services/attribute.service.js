'use strict';

const AttributeModel = require('../models/attribute.model');
const { BadRequestError, InternalServerError, AuthFailureError, ForbiddenError } = require('../core/error.response');

class AttributeService {
  static create = async (params) => {
    const { name } = params;
    // Step 1: Check attribute exited
    const existAttribute = await AttributeModel.findOne({ name }).lean();
    if (existAttribute) {
      throw new BadRequestError('[ERROR]: This attribute already created');
    }
    const newAttribute = await AttributeModel.create({
      ...params,
    });
    if (!newAttribute) {
      throw new InternalServerError('[ERROR]: Create Attribute failed.');
    }
    return {
      attribute: newAttribute,
    };
  };
}

module.exports = AttributeService;
