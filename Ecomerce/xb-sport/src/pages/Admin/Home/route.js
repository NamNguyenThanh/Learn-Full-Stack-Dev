import HomeAdmin from '.';
// Import Home directly instead of lazy load. Because load home page by default
const route = {
  path: '/admin',
  exact: true,
  public: true,
  component: HomeAdmin,
  // component: lazy(() => import('.')),
};
export default route;
