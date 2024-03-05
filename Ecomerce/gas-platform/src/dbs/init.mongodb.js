'use strict';
const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const connectStr = 'mongodb://localhost:27017/ecom-gas-platform';

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      // dev env
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectStr, {
        maxPoolSize: 50,
      })
      .then((_) => console.log('Connected MongoDB Success. Num of Connections:', countConnect()))
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
