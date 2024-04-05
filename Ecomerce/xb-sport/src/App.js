import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from './pages/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ component: Component, path, ...rest }) => (
          <Route
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <Component />
              </React.Suspense>
            }
            key={path}
            path={path}
            {...rest}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
