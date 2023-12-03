import { createSlice } from '@reduxjs/toolkit';
import { offlineActionTypes } from 'react-native-offline';
import { addDataCreatorFn, updateData } from './dataThunk';

const initialState = {
  loading: false,
  errorMessage: '',
  addDataSuccess: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.loading = false;
      state.errorMessage = '';
    },
    clearSuccessFlag: (state) => {
      // console.log('***** CLEAR SUCCESS FLAG *****');
      state.addDataSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addData.pending, (state) => {
      //   state.loading = true;
      //   state.errorMessage = '';
      //   state.addDataSuccess = false;
      // })
      // .addCase(addData.fulfilled, (state) => {
      //   state.loading = false;
      //   state.addDataSuccess = true;
      // })
      // .addCase(addData.rejected, (state, action) => {
      //   state.loading = false;
      //   state.errorMessage = action.payload;
      // });
      .addCase(offlineActionTypes.CONNECTION_CHANGE, (state, action) => {
        console.log('**** OFFLINE ACTION TYPES - CONNECTION_CHANGE ****');
        console.log('state:', state);
        console.log('action:', action);
      })
      .addCase(offlineActionTypes.FETCH_OFFLINE_MODE, (state, action) => {
        console.log('**** OFFLINE ACTION TYPES - FETCH_OFFLINE_MODE ****');
        console.log('state:', state);
        console.log('action:', action);
        console.log('action.payload:', action.payload);
      })
      .addCase(addDataCreatorFn.pending, (state) => {
        // console.log('**** ACTION_CREATOR_FN - PENDING ****');
        state.loading = true;
        state.errorMessage = '';
        state.addDataSuccess = false;
      })
      .addCase(addDataCreatorFn.fulfilled, (state) => {
        // console.log('**** ACTION_CREATOR_FN - FULFILLED ****');
        state.loading = false;
        state.addDataSuccess = true;
      })
      .addCase(addDataCreatorFn.rejected, (state, action) => {
        // console.log('**** ACTION_CREATOR_FN - REJECTED ****');
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
        state.addDataSuccess = false;
      })
      .addCase(updateData.fulfilled, (state) => {
        state.loading = false;
        state.addDataSuccess = true;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearErrors, clearSuccessFlag } = dataSlice.actions;

export default dataSlice.reducer;

export const getNetworkActionQueue = (state) => state.network.actionQueue;
