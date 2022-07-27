import React, { lazy } from 'react';

const Home = lazy(() => import('../../screens/home/Home'));
const SearchPage = lazy(() => import('../../screens/searchPage/SearchPage'));

export const routes = [
  { path: '/', component: <Home /> },
  { path: '/Search', component: <SearchPage /> },
];
