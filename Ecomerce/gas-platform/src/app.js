const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// Init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// Init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
// checkOverload();

// Init router
app.use('/', require('./routers'));

// Handle errors

module.exports = app;
