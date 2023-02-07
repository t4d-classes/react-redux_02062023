import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStock } from './stockAPI';

const initialState = {
  stock: {
    symbol: '',
    open: 0,
    close: 0,
    high: 0,
    low: 0,
    volume: 0,
    volumeWeightedAveragePrice: 0,
    numberOfTransactions: 0,
    lastUpdated: null,
  },
  status: 'idle',
};

export const getStockAsync = createAsyncThunk(
  'stockTool/fetchStock', // action name
  async (stockSymbol) => {
    const stockData = await fetchStock(stockSymbol);
    return stockData;
  }
);

export const stockToolSlice = createSlice({
  name: 'stockTool',
  initialState, // short-hand property, initialState: initialState,
  reducers: {
    // action = reducer
    // defining both an action and a reducer
    // lookupStockPrice: (state, action) => {
    //   state.stockSymbol = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStockAsync.fulfilled, (state, action) => {
        const stockData = action.payload;
        state.status = 'idle';
        state.stock = {
          symbol: stockData.T,
          open: stockData.o,
          close: stockData.c,
          low: stockData.l,
          high: stockData.h,
          volume: stockData.v,
          volumeWeightedAveragePrice: stockData.vw,
          numberOfTransactions: stockData.n,
          lastUpdated: new Date(stockData.t).toLocaleString(),
        };
      })
  }
});

// export const { lookupStockPrice } = stockToolSlice.actions;

export const selectStock = (state) => state.stockTool.stock;

export default stockToolSlice.reducer;