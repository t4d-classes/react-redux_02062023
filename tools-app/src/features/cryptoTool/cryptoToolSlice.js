import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoin } from './cryptoAPI';
import { calcChange } from '../../utils';

const initialState = {
  coinName: '',
  coinPrice: 0,
  lastCoinPrice: 0,
  lastUpdated: null,
  anotherProp: -1
};

export const getCoinAsync = createAsyncThunk(
  'cryptoTool/fetchCoin',
  async (coinName) => {
    const coinPrice = await fetchCoin(coinName);
    return {
      coinName,
      coinPrice,
      lastUpdated: new Date().toLocaleString(),
    };
  });

export const cryptoToolSlice = createSlice({
  name: 'cryptoTool',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCoinAsync.fulfilled, (state, action) => {
        const {
          coinName, coinPrice, lastUpdated
        } = action.payload;

        state.status = 'idle';
        state.lastCoinPrice = state.coinName !== coinName ? 0 : state.coinPrice;
        state.coinName = coinName;
        state.coinPrice = coinPrice;
        state.lastUpdated = lastUpdated;
      });
  }
});

export const selectCoinPrice = ({ cryptoTool }) => {

  const [
    coinPriceChange,
    coinPercentPriceChange,
  ] = calcChange(cryptoTool.lastCoinPrice, cryptoTool.coinPrice);

  return {
    name: cryptoTool.coinName,
    price: cryptoTool.coinPrice,
    priceChange: coinPriceChange,
    percentPriceChange: coinPercentPriceChange,
    lastUpdated: cryptoTool.lastUpdated,
  };
};

export default cryptoToolSlice.reducer;