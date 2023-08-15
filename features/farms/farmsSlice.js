import { createSlice } from '@reduxjs/toolkit';
import { fetchActiveFarms } from './farmsThunk';

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
      .addCase(fetchActiveFarms.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(fetchActiveFarms.fulfilled, (state, action) => {
        state.farms = action.payload;
        state.loading = false;
      })
      .addCase(fetchActiveFarms.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default farmsSlice.reducer;
