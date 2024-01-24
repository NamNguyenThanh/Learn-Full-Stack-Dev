"use strict";
const express = require("express");
const userController = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.get("/logout/:id", userController.logout);

module.exports = userRoute;
