/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Spinner from './component/Spinner/spinner';
import { routes } from './modules/Routes/pages';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                ></Route>
              );
            })}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
