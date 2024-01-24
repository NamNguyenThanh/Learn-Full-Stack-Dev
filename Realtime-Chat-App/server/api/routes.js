"use strict";
const express = require("express");
const createError = require("http-errors");
const v1Route = require("./v1/routes/index");

const routes = express.Router();

// API Version 1
routes.use("/api/v1", v1Route);

// Handdle HTTP error
routes.use((req, res, next) => {
  next(createError.NotFound("This route does not exist."));
});
routes.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = routes;
