'use strict';

const AccessService = require('../services/access.service');
const { CREATED, OK } = require('../core/success.response');

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: 'Your account has been created',
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    new OK({
      message: 'Login successful',
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
