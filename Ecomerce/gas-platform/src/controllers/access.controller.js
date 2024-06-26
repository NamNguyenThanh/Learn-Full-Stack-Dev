'use strict';

const AccessService = require('../services/access.service');
const { CREATED, OK } = require('../core/success.response');

class AccessController {
  handleRefreshToken = async (req, res, next) => {
    new OK({
      message: 'Get Token Success!',
      metadata: await AccessService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyToken: req.keyToken,
      }),
    }).send(res);
  };
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

  logout = async (req, res, next) => {
    new OK({
      message: 'Logout successful',
      metadata: await AccessService.logout({ keyToken: req.keyToken }),
    }).send(res);
  };
}

module.exports = new AccessController();
