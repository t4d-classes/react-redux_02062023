import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import {
  fetchStock,
  fetchWatchList,
  saveWatchList,
  fetchStocks,
} from './stockAPI';
import debounce from 'lodash.debounce';

const initialState = {
  stocks: [], // the structure of the stock object is no longer apparent
  status: 'idle',
};

export const getStockAsync = createAsyncThunk(
  'stockTool/fetchStock',
  async (stockSymbol) => {
    const stockData = await fetchStock(stockSymbol);
    return stockData;
  },
);

export const addToWatchListAsync = createAsyncThunk(
  'stockTool/addToWatchList',
  async (stockSymbol) => {
    const stockWatchLists = await fetchWatchList('My Stocks');
    const stockWatchList = stockWatchLists[0];
    if (stockWatchList.stockSymbols.includes(stockSymbol)) {
      return;
    }

    stockWatchList.stockSymbols.push(stockSymbol);
    await saveWatchList(stockWatchList);

    const stockData = await fetchStock(stockSymbol);
    return stockData;
  },
);

const refreshWatchListFulfilled = createAction(
  'stockTool/refreshWatchListFulfilled',
);

export const refreshWatchListAsync = createAsyncThunk(
  'stockTool/refreshWatchListDebounced',
  debounce(async (_, { dispatch }) => {
    const stockWatchLists = await fetchWatchList('My Stocks');
    const stockWatchList = stockWatchLists[0];
    const stocks = await fetchStocks(stockWatchList.stockSymbols);
    dispatch(refreshWatchListFulfilled(stocks));
  }, 200),
);

export const removeStockFromWatchListAsync = createAsyncThunk(
  'stockTool/removeStockFromWatchList',
  async (stockSymbol) => {
    const stockWatchLists = await fetchWatchList('My Stocks');
    const stockWatchList = stockWatchLists[0];
    if (!stockWatchList.stockSymbols.includes(stockSymbol)) {
      return;
    }

    const stockSymbolIndex = stockWatchList.stockSymbols.findIndex(theStockSymbol => {
      return stockSymbol === theStockSymbol;
    });
    stockWatchList.stockSymbols.splice(stockSymbolIndex, 1);

    await saveWatchList(stockWatchList);

    return stockSymbol;
  },
);



export const stockToolSlice = createSlice({
  name: 'stockTool',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWatchListAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        if (!action.payload) {
          return;
        }

        const stockData = action.payload;
        const stock = {
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
        state.stocks.push(stock);
      })
      .addCase(refreshWatchListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshWatchListFulfilled, (state, action) => {
        state.status = 'idle';

        if (!action.payload) {
          return;
        }

        state.stocks = action.payload.map((stockData) => {
          return {
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
        });
      })
      .addCase(removeStockFromWatchListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeStockFromWatchListAsync.fulfilled, (state, action) => {

        state.status = 'idle';

        if (!action.payload) {
          return;
        }

        const stockSymbol = action.payload;
        const stockIndex = state.stocks.findIndex(s => s.symbol === stockSymbol);
        state.stocks.splice(stockIndex, 1);
      });
  },
});

export const selectStocks = ({ stockTool: { stocks } }) => {
  return stocks.map(stock => ({
    symbol: stock.symbol,
    name: stock.symbol,
    price: stock.close,
    priceChange: stock.close - stock.open,
    pricePercentChange: ((stock.close - stock.open) / stock.open) * 100,
    lastUpdated: stock.lastUpdated
  }));
};

export default stockToolSlice.reducer;