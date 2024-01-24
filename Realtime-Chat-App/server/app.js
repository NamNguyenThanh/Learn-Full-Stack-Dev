const express = require("express");
const helmet = require("helmet"); // Secure Express Apps by setting HTTP response headers
const morgan = require("morgan"); // HTTP request logger middleware

const app = express();
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
