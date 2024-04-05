"use strict";
const User = require("../models/user.model");

module.exports.getUser = async (query) => {
  return await User.findOne(query);
};

module.exports.createUser = async (info) => {
  const newUser = new User(info);
  return await newUser.save();
};
