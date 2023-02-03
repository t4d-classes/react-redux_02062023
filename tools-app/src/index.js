import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {store} from './app/store';
import App from './App';
import {Home} from './Home';
import {Counter} from './features/counter/Counter';

import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '',
        element: <Home />,
      },
      {
        path: 'counter-tool',
        element: <Counter />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
