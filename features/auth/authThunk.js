import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { getTokenPayload, setToken } from '../../utils/tokenManager';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      setToken(response.data.token);
      const token = await getTokenPayload();
      return { token, user: response.data.user };
    } catch (err) {
      // console.error('ERROR:', err);
      return rejectWithValue('Incorrect Login Details');
    }
  }
);

// export const actionCreatorFn = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, credentials);
//       setToken(response.data.token);
//       const token = await getTokenPayload();
//       return { token, user: response.data.user };
//     } catch (err) {
//       console.error('ERROR:', err);
//       return rejectWithValue('Incorrect Login Details');
//     }
//   }
// );

// export const loginUser = (credentials) => {
//   function createOfflineThunk() {
//     const forOffline = actionCreatorFn(credentials);

//     return Object.assign(forOffline, actionCreatorFn, {
//       interceptInOffline: true,
//       meta: {
//         ...(actionCreatorFn.meta || {}),
//         name: 'loginUser' + Math.random(),
//         return: true,
//         args: [],
//       },
//     });
//   }

//   return createOfflineThunk();
// };
