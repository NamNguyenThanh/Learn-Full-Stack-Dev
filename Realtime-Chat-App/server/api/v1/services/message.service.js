'use strict';
const Message = require('../models/message.model');

module.exports.addMessage = async (from, to, message) => {
  return await Message.create({
    from_user: from,
    to_user: to,
    message,
  });
};

module.exports.getMessage = async (from, to) => {
  return await Message.find({
    from_user: from,
    to_user: to,
  }).sort({ updatedAt: 1 });
};
