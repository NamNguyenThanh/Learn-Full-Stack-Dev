'use strict';

const CategoryModel = require('../models/category.model');
const { BadRequestError } = require('../core/error.response');

class CategoryService {
  static create = async ({ name, parent, thumbnail, icon }) => {
    // Check parent category and create path
    let path;
    if (parent === undefined || parent === '') {
      path = null;
    } else {
      const parentCategory = await CategoryModel.findOne({ name: parent });
      if (!parentCategory) throw new BadRequestError('Not found parent category');
      path =
        parentCategory.path === null ? `,${parentCategory.name},` : `${parentCategory.path + parentCategory.name},`;
    }
    // Check existing category
    const existCat = await CategoryModel.findOne({ name, path });
    if (existCat) throw new BadRequestError('This category already exists');

    // Save thumbnail, icon and return public path
    const newCategory = await CategoryModel.create({
      name,
      path,
      thumbnail: thumbnail ? thumbnail.path.slice(thumbnail.path.indexOf('\\api')) : null,
      icon: icon ? icon.path.slice(icon.path.indexOf('\\api')) : null,
    });
    return newCategory;
  };
}

module.exports = CategoryService;
