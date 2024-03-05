const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// Init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// Init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();

// Init router
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

// Handle errors

module.exports = app;
