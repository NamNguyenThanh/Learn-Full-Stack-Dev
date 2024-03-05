const app = require('./src/app');
const {
  app: { port },
} = require('./src/configs/config');

const server = app.listen(port, () => {
  console.log('Server is running on port', port);
});

process.on('SIGINT', () => {
  server.close(() => console.log('Exit Server Express'));
  // notify.send(ping...)
});
