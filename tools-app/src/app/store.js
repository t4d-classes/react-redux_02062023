import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import stockToolReducer from '../features/stockTool/stockToolSlice';
import cryptoToolReducer from '../features/cryptoTool/cryptoToolSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stockTool: stockToolReducer,
    cryptoTool: cryptoToolReducer,
  },
});
