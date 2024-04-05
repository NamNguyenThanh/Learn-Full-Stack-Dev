import { lazy } from 'react';

const route = {
  path: '*',
  exact: true,
  public: true,
  component: lazy(() => import('.')),
};
export default route;
