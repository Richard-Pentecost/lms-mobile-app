import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const actionCreatorFn = createAsyncThunk(
  'data/FETCH_RANDOM_NAME',
  async () => {
    const response = await axios.get('https://randomuser.me/api');
    return response.data.results[0].email;
  }
);

export const fetchRandomName = () => {
  function createOfflineThunk() {
    const forOffline = actionCreatorFn();
    return Object.assign(forOffline, actionCreatorFn, {
      interceptInOffline: true,
      meta: {
        ...(actionCreatorFn.meta || {}),
        name: 'fetchRandomName' + Math.random(),
        retry: true,
        args: [],
      },
    });
  }
  return createOfflineThunk();
};
