let routes = [];

const context = require.context('.', true, /route.js$/);
context.keys().forEach((path) => {
  routes.push(require(`${path}`).default);
});

export default routes;
