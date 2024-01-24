"use strict";
module.exports.register = async (req, res, next) => {
  try {
    console.log("Register user:::", req.body);
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
