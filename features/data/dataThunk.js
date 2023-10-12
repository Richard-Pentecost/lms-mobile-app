import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { getToken } from '../../utils/tokenManager';

export const addData = createAsyncThunk(
  'data/addData',
  async ({ data, previousData }, { rejectWithValue }) => {
    try {
      const previousDataUuid = previousData.length > 0 && previousData[0].uuid;
      const { farmFk: farmId } = data;
      const headers = { Authorization: await getToken() };
      await axios.post(
        `${API_URL}/farms/${farmId}/data`,
        { data, previousDataUuid },
        { headers }
      );
      return;
    } catch (error) {
      console.error(error);
      return rejectWithValue('There was an error adding data');
    }
  }
);
