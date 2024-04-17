import Home from '.';
// Import Home directly instead of lazy load. Because load home page by default
const route = {
  path: '/',
  exact: true,
  public: true,
  component: Home,
  // component: lazy(() => import('.')),
};
export default route;
