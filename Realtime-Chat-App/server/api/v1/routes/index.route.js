'use strict';
const express = require('express');
const userRoute = require('./user.route');
const chatRoute = require('./message.route');

const v1Route = express.Router();
v1Route.use('/user', userRoute);
v1Route.use('/chat', chatRoute);

module.exports = v1Route;
