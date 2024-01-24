"use strict";
const express = require("express");
const userRoute = require("./user.route");

const v1Route = express.Router();
v1Route.use("/user", userRoute);

module.exports = v1Route;
