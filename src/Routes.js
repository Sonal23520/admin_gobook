/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import { Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFound } from './pages/Not-Found';
import { Home } from './pages/Home';
import { Book } from './pages/Book';
import { Category } from './pages/Category';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard"/>
  },
  {
    path: 'dashboard',
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <Home/>
      },

      {
        path: 'book',
        element: <Book/>
      },
      {
        path: 'category',
        element: <Category/>
      },

      {
        path: '*',
        element: <Navigate to="/404"/>
      }
    ]
  },
  {
    path: '404',
    element: <NotFound/>
  }
];
