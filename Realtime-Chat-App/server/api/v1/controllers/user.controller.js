"use strict";
const userService = require("../services/user.service");
const createError = require("http-errors");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // TODO: Validate input using Joi or mongoose validation

    // Check username or email was register
    if (await userService.getUser({ username })) {
      throw createError.Conflict("Username already used");
    }
    if (await userService.getUser({ email })) {
      throw createError.Conflict("Email already used");
    }

    // Create new user
    const user = await userService.createUser({ username, email, password });
    delete user.password;

    return res.json({
      status: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    console.log("Login user:::", req.body);
  } catch (error) {
    next(error);
  }
};

module.exports.logout = (req, res, next) => {
  try {
    console.log("Logout user:::", req.body);
  } catch (error) {
    next(error);
  }
};
