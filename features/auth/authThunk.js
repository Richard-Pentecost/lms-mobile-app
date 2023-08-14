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
      console.error('ERROR: ', err);
      return rejectWithValue('Incorrect Login Details');
    }
  }
);
