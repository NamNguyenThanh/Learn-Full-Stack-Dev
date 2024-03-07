'use strict';
const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode/httpStatusCode');

class SuccessResponse {
  constructor({ message, status = StatusCodes.OK, reason = ReasonPhrases.OK, metadata = {} }) {
    this.message = message ? message : reason;
    this.status = status;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, status = StatusCodes.CREATED, reason = ReasonPhrases.CREATED, metadata }) {
    super({ message, status, reason, metadata });
  }
}

module.exports = {
  OK,
  CREATED,
};
