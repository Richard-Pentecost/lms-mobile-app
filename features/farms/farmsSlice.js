import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { fetchActiveFarmsCreatorFn } from './farmsThunk';

const initialState = {
  farms: null,
  loading: false,
  errorMessage: '',
  selectedFarm: null,
};

const farmsSlice = createSlice({
  name: 'farms',
  initialState,
  reducers: {
    selectedFarm: (state, action) => {
      const farm = state.farms.find((farm) => farm.uuid === action.payload);
      state.selectedFarm = farm;
    },
    clearSelectedFarm: (state) => {
      state.selectedFarm = null;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { selectedFarm, clearSelectedFarm } = farmsSlice.actions;

export default farmsSlice.reducer;

export const getFarmsState = (state) => state.farmsState;
