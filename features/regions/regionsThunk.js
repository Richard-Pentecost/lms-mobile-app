import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { getToken } from '../../utils/tokenManager';

export const fetchRegions = createAsyncThunk(
  'regions/fetchRegions',
  async (_, { rejectWithValue }) => {
    try {
      const headers = { Authorization: await getToken() };
      const { data: regions } = await axios.get(`${API_URL}/regions`, {
        headers,
      });

      return regions;
    } catch (err) {
      console.error('ERROR:', err);
      return rejectWithValue('There was an error fetching regions');
    }
  }
);
