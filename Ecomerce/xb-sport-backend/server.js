'use strict';
const app = require('./app');
const {
  app: { port },
} = require('./config/db.config');

const server = app.listen(port, () => {
  console.log('Server is running on port', port);
});
process.on('SIGINT', () => {
  server.close(() => console.log('Exit Server Express'));
  // notify.send(ping...)
});
