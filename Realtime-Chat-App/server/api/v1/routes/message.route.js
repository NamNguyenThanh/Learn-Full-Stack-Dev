'use strict';
const express = require('express');
const chatController = require('../controllers/message.controller');

const chatRoute = express.Router();
chatRoute.post('/add-msg', chatController.addMessage);
chatRoute.post('/get-msg', chatController.getMessage);

module.exports = chatRoute;
