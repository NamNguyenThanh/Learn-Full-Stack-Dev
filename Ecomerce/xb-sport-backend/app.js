'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const { ReasonPhrases, StatusCodes } = require('./api/v1/utils/httpStatusCode/httpStatusCode');
const app = express();

// Init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(compression());
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Init db & check overload
require('./api/v1/dbs/init.mongodb');
const { checkOverload } = require('./api/v1/helpers/check.connect');
// checkOverload();

// Init router
app.use(require('./api/routes'));

// Handle errors
// Ham middleware co 3 tham so (req, res, next)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
// Ham quan ly loi co 4 tham so (error, req, res, next)
app.use((err, req, res, next) => {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({
    status: statusCode,
    message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    stack: err.stack,
  });
});

module.exports = app;
