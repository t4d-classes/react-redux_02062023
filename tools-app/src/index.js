import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './app/store';
import App from './App';
import { Home } from './Home';

import { Counter } from './features/counter/Counter';
import { StockTool, StockDetail } from './features/stockTool';
import { CryptoTool } from './features/cryptoTool/CryptoTool';

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
      {
        path: 'stock-tool',
        element: <StockTool />,
        children: [
          {
            path: '',
            element: <div>Select Stock</div>,
          },
          {
            path: 'view/:stockSymbol',
            element: <StockDetail />,
          },
        ],
      },
      {
        path: 'crypto-tool',
        element: <CryptoTool />,
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
