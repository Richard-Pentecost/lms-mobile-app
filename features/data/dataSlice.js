import { createSlice } from '@reduxjs/toolkit';
import { addData } from './dataThunk';

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
      state.addDataSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addData.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
        state.addDataSuccess = false;
      })
      .addCase(addData.fulfilled, (state) => {
        state.loading = false;
        state.addDataSuccess = true;
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearErrors, clearSuccessFlag } = dataSlice.actions;

export default dataSlice.reducer;
