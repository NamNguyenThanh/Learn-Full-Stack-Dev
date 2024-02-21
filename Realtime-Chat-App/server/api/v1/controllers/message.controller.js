'use strict';
const messageService = require('../services/message.service');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    await messageService.addMessage(from, to, message);
    _io.emit('chat message', message);
    return res.json({
      status: 200,
      message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageService.getMessage(from, to);
    return res.json({
      status: 200,
      messages,
    });
  } catch (error) {
    next(error);
  }
};
