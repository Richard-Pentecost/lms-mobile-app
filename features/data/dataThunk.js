import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { getToken } from '../../utils/tokenManager';

// export const addData = createAsyncThunk(
//   'data/addData',
//   async ({ data, previousData }, { rejectWithValue }) => {
//     try {
//       const previousDataUuid = previousData.length > 0 && previousData[0].uuid;
//       const { farmFk: farmId } = data;
//       const headers = { Authorization: await getToken() };
//       await axios.post(
//         `${API_URL}/farms/${farmId}/data`,
//         { data, previousDataUuid },
//         { headers }
//       );
//       return;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue('There was an error adding data');
//     }
//   }
// );

export const actionCreatorFn = createAsyncThunk(
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

export const addData = (data) => {
  function createOfflineThunk() {
    const forOffline = actionCreatorFn(data);
    return Object.assign(forOffline, actionCreatorFn, {
      interceptInOffline: true,
      meta: {
        ...(actionCreatorFn.meta || {}),
        name: 'addData' + Math.random(),
        retry: true,
        args: [],
      },
    });
  }
  return createOfflineThunk();
};

export const deleteData = createAsyncThunk(
  'data/deleteData',
  async ({ farmId, dataId }, { rejectWithValue }) => {
    try {
      const headers = { Authorization: await getToken() };
      await axios.delete(`${API_URL}/farms/${farmId}/data/${dataId}`, {
        headers,
      });
      return;
    } catch (error) {
      console.error(error);
      return rejectWithValue('There was an error deleting data');
    }
  }
);
