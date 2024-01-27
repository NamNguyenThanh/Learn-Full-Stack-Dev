"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const connection = require("../databases/init.mongodb");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: [3, "Username must be at least 3, got {VALUE}"],
    max: [20, "Username must be shorter than 20, got {VALUE}"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: [50, "Email must be shorter than 20, got {VALUE}"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password must be at least 3, got {VALUE}"],
  },
});

// Hash password before saving user to DB
userSchema.pre("save", async function (next) {
  // Note: Don't use around func here. Because in around func "this" not exist
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare hashed password
userSchema.methods.isPasswordValid = async function (password) {
  // Note: Don't use around func here. Because in around func "this" not exist
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createError.Unauthorized();
  }
};

module.exports = connection.model("Users", userSchema);
