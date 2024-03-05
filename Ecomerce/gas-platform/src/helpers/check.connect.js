'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;
//count connections
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  return numConnection;
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCore = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnection = numCore * 5; //Suppose max 5 connections per core
    console.log(`Number of connection: ${numConnection}`);
    console.log(`Memory Usage: ${memoryUsage / 1024 / 1024}MB`);
    if (numConnection > maxConnection) {
      console.log(`Overload: ${numConnection} > ${maxConnection}`);
    }
  }, _SECONDS); // mornitor every 5 seconds
};
module.exports = { countConnect, checkOverload };
