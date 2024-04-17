'use strict';

const AttributeService = require('../services/attribute.service');
const { CREATED, OK } = require('../core/success.response');

class AttributeController {
  create = async (req, res) => {
    new CREATED({
      message: 'New attribute has been created',
      metadata: await AttributeService.create(req.body),
    }).send(res);
  };
}

module.exports = new AttributeController();
