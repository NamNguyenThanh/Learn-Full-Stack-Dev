'use strict';
require('dotenv/config');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const SocketServices = require('./api/v1/services/socket.service');
const app = require('./app');
const server = createServer(app);

console.log('___dirname: ', __dirname);

global._io = new Server(server);
global._io.on('connection', SocketServices.connection);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Đã khởi tạo server tại cổng ${port}`);
});
