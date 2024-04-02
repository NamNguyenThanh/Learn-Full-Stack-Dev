'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const env = process.env.NODE_ENV || 'dev';
const {
  db: { host, port, name },
} = require('../../../config/db.config');
const connectStr = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    if (env === 'dev') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectStr, {
        maxPoolSize: 50,
      })
      .then((_) =>
        console.log(`Connected MongoDB Success at mongodb://${host}:${port}/${name}. NoC: ${countConnect()}`),
      )
      .catch((err) => console.error('Error Connect!'));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
