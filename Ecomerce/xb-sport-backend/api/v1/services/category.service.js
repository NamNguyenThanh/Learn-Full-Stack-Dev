'use strict';

const path = require('path');
const fs = require('fs');
const CategoryModel = require('../models/category.model');
const { BadRequestError, InternalServerError } = require('../core/error.response');

class CategoryService {
  static create = async ({ host, name, path, thumbnail, icon }) => {
    // Check parent category and create parent_path
    let parent_name;
    if (path === undefined || path === '') {
      parent_name = null;
    } else {
      const path_items = path.split(',');
      parent_name = path_items[path_items.length - 2];
      const parentCategory = await CategoryModel.findOne({
        name: parent_name,
        path: path_items.length === 3 ? null : path.slice(0, -(parent_name.length + 1)),
      });
      if (!parentCategory) throw new BadRequestError('Not found parent category');
    }
    // Check existing category
    const existCat = await CategoryModel.findOne({ name, path });
    if (existCat) throw new BadRequestError('This category already exists');

    // Save thumbnail, icon and return public parent_path
    const newCategory = await CategoryModel.create({
      name,
      path,
      thumbnail: thumbnail
        ? host + thumbnail.path.slice(thumbnail.path.indexOf('\\api')).replaceAll((/\\/g, '/'))
        : null,
      icon: icon ? host + icon.path.slice(icon.path.indexOf('\\api')).replaceAll(/\\/g, '/') : null,
    });
    return newCategory;
  };

  static getAllCategory = async () => {
    const categories = await CategoryModel.find().sort({ path: 1, name: 1 });
    return { categories };
  };

  static delete = async (id) => {
    const category = await CategoryModel.findOneAndDelete({ _id: id });
    if (category) {
      if (category.thumbnail) {
        // Delete thumbnail
        const thumbnail_path = path.join(
          __dirname,
          '..',
          category.thumbnail.slice(category.thumbnail.indexOf('public')),
        );
        fs.unlink(thumbnail_path, (err) => {
          if (err) throw InternalServerError(`Error deleting file: ${err}`);
        });
      }
      if (category.icon) {
        // Delete icon
        const icon_path = path.join(__dirname, '..', category.icon.slice(category.icon.indexOf('public')));
        fs.unlink(icon_path, (err) => {
          if (err) throw InternalServerError(`Error deleting file: ${err}`);
        });
      }
      return {
        category,
      };
    } else {
      throw new BadRequestError('Not found category');
    }
  };
}

module.exports = CategoryService;
