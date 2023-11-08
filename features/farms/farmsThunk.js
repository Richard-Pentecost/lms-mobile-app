import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { getToken } from '../../utils/tokenManager';

// export const fetchActiveFarms = createAsyncThunk(
//   'farms/fetchActiveFarms',
//   async (_, { rejectWithValue }) => {
//     try {
//       const headers = { Authorization: await getToken() };
//       const { data: farms } = await axios.get(`${API_URL}/farms/active`, {
//         headers,
//       });

//       return farms;
//     } catch (err) {
//       console.error('ERROR:', err);
//       return rejectWithValue('There was an error fetching farms');
//     }
//   }
// );

export const fetchActiveFarmsCreatorFn = createAsyncThunk(
  'farms/FETCH_ACTIVE_FARMS',
  async (_, { rejectWithValue }) => {
    try {
      const headers = { Authorization: await getToken() };
      const { data: farms } = await axios.get(`${API_URL}/farms/active`, {
        headers,
      });

      return farms;
    } catch (err) {
      console.error('ERROR:', err);
      return rejectWithValue('There was an error fetching farms');
    }
  }
);

export const fetchActiveFarms = () => {
  function createOfflineThunk() {
    const forOffline = fetchActiveFarmsCreatorFn();
    return Object.assign(forOffline, fetchActiveFarmsCreatorFn, {
      interceptInOffline: true,
      meta: {
        ...(fetchActiveFarmsCreatorFn.meta || {}),
        name: 'fetchActiveFarms' + Math.random(),
        retry: true,
        args: [],
      },
    });
  }
  return createOfflineThunk();
};
