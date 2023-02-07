import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import stockToolReducer from '../features/stockTool/stockToolSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stockTool: stockToolReducer,
  },
});
