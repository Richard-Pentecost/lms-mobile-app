import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { fetchActiveFarmsCreatorFn } from './farmsThunk';

const initialState = {
  farms: null,
  loading: false,
  errorMessage: '',
};

const farmsSlice = createSlice({
  name: 'farms',
  initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(fetchActiveFarms.pending, (state) => {
      //   state.loading = true;
      //   state.errorMessage = '';
      // })
      // .addCase(fetchActiveFarms.fulfilled, (state, action) => {
      //   state.farms = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchActiveFarms.rejected, (state, action) => {
      //   state.loading = false;
      //   state.errorMessage = action.payload;
      // });
      .addCase(fetchActiveFarmsCreatorFn.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(fetchActiveFarmsCreatorFn.fulfilled, (state, action) => {
        state.farms = action.payload;
        state.loading = false;
      })
      .addCase(fetchActiveFarmsCreatorFn.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export default farmsSlice.reducer;
