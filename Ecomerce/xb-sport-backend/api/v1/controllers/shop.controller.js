'use strict';

const ShopService = require('../services/shop.service');
const { CREATED, OK } = require('../core/success.response');

class ShopController {
  signUp = async (req, res) => {
    new CREATED({
      message: 'Your account has been created',
      metadata: await ShopService.signUp(req.body),
    }).send(res);
  };

  login = async (req, res) => {
    new OK({
      message: 'Login successful',
      metadata: await ShopService.login(req.body),
    }).send(res);
  };

  logout = async (req, res) => {
    new OK({
      message: 'Logout successful',
      metadata: await ShopService.logout({ keyToken: req.keyToken }),
    }).send(res);
  };

  handleRefreshToken = async (req, res) => {
    new OK({
      message: 'Get Token Success!',
      metadata: await ShopService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyToken: req.keyToken,
      }),
    }).send(res);
  };
}

module.exports = new ShopController();
