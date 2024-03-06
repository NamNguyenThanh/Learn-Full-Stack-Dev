'use strict';

const AccessService = require('../services/access.service');
const { CREATED } = require('../core/success.response');

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: 'Your account has been created',
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
