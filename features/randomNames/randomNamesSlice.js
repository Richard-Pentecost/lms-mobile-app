import { createSlice } from '@reduxjs/toolkit';
import { offlineActionTypes } from 'react-native-offline';
import { PURGE } from 'redux-persist';
import { actionCreatorFn } from './randomNamesThunk';

const initialState = {
  randomNames: [],
};

const randomNamesSlice = createSlice({
  name: 'randomNames',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(offlineActionTypes.CONNECTION_CHANGE, (state, action) => {
        console.log('**** OFFLINE ACTION TYPES - CONNECTION_CHANGE ****');
      })
      .addCase(offlineActionTypes.FETCH_OFFLINE_MODE, (state, action) => {
        console.log('**** OFFLINE ACTION TYPES - FETCH_OFFLINE_MODE ****');
      })
      .addCase(actionCreatorFn.fulfilled, (state, action) => {
        console.log('**** ACTION CREATOR FN -FULFILLED ****');
        const existingData = state.randomNames;
        const id = existingData.length + 1;
        existingData.push({ id, title: action.payload });
        state.ranndomNames = existingData;
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export default randomNamesSlice.reducer;

export const getRandomUserEmail = (state) => state.randomNamesState.randomNames;
export const getConnectivityStatus = (state) => state.network.isConnected;
export const getNetworkActionQueue = (state) => state.network.actionQueue;
