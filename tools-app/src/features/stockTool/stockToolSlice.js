import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  stockSymbol: '',
};

export const stockToolSlice = createSlice({
  name: 'stockTool',
  initialState, // short-hand property, initialState: initialState,
  reducers: {
    // action = reducer
    // defining both an action and a reducer
    lookupStockPrice: (state, action) => {
      state.stockSymbol = action.payload;
    },
  }
});

export const { lookupStockPrice } = stockToolSlice.actions;

export const selectStockSymbol = (state) => state.stockTool.stockSymbol;

export default stockToolSlice.reducer;