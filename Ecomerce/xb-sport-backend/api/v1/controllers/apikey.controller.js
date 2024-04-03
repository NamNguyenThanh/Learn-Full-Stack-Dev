'use strict';

const ApiKeyService = require('../services/apikey.service');
const { CREATED, OK } = require('../core/success.response');

class ApiKeyController {
  createKey = async (req, res) => {
    new CREATED({
      message: 'New Api Key has been created',
      metadata: await ApiKeyService.createKey(req.body),
    }).send(res);
  };
}

module.exports = new ApiKeyController();
