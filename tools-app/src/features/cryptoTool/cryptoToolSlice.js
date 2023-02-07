import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  coinName: '',
};

export const cryptoToolSlice = createSlice({
  name: 'cryptoTool',
  initialState, // short-hand property, initialState: initialState,
  reducers: {
    // action = reducer
    // defining both an action and a reducer
    lookupCoinPrice: (state, action) => {
      state.coinName = action.payload;
    },
  }
});

export const { lookupCoinPrice } = cryptoToolSlice.actions;

export const selectCoinName = (state) => state.cryptoTool.coinName;

export default cryptoToolSlice.reducer;