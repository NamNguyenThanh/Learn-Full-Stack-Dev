'use strict';

const path = require('path');
const CategoryModel = require('../models/category.model');
const { BadRequestError } = require('../core/error.response');

class CategoryService {
  static create = async ({ host, name, parent, thumbnail, icon }) => {
    // Check parent category and create parent_path
    let parent_path;
    if (parent === undefined || parent === '') {
      parent_path = null;
    } else {
      const parentCategory = await CategoryModel.findOne({ name: parent });
      if (!parentCategory) throw new BadRequestError('Not found parent category');
      parent_path =
        parentCategory.path === null ? `,${parentCategory.name},` : `${parentCategory.path + parentCategory.name},`;
    }
    // Check existing category
    const existCat = await CategoryModel.findOne({ name, parent_path });
    if (existCat) throw new BadRequestError('This category already exists');

    // Save thumbnail, icon and return public parent_path
    const newCategory = await CategoryModel.create({
      name,
      path: parent_path,
      thumbnail: thumbnail ? path.join(host, thumbnail.path.slice(thumbnail.path.indexOf('\\api'))) : null,
      icon: icon ? path.join(host, icon.path.slice(icon.path.indexOf('\\api'))) : null,
    });
    return newCategory;
  };

  static getAllCategory = async () => {
    const categories = await CategoryModel.find().sort({ path: 1, name: 1 });
    return { categories };
  };
}

module.exports = CategoryService;
