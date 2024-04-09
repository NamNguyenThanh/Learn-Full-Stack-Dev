'use strict';

const CategoryService = require('../services/category.service');
const { CREATED, OK } = require('../core/success.response');

class CategoryController {
  create = async (req, res) => {
    new CREATED({
      message: 'New category has been created',
      metadata: await CategoryService.create({
        icon: req.files['icon'] ? req.files['icon'][0] : null,
        thumbnail: req.files['thumbnail'] ? req.files['thumbnail'][0] : null,
        ...req.body,
      }),
    }).send(res);
  };

  getAllCategory = async (req, res) => {
    new OK({
      message: 'All categories',
      metadata: await CategoryService.getAllCategory(),
    }).send(res);
  }
}

module.exports = new CategoryController();
