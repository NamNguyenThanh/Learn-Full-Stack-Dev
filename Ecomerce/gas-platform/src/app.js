const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const { ReasonPhrases, StatusCodes } = require('./utils/httpStatusCode/httpStatusCode');
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
    code: statusCode,
    status: 'error',
    stack: err.stack,
    message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
});

module.exports = app;
