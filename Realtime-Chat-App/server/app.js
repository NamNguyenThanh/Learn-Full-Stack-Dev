'use strict';
const express = require('express');
const helmet = require('helmet'); // Secure Express Apps by setting HTTP response headers
const morgan = require('morgan'); // HTTP request logger middleware
const routes = require('./api/routes');

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

module.exports = app;
