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

export const addDataCreatorFn = createAsyncThunk(
  'data/ADD_DATA',
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
    const forOffline = addDataCreatorFn(data);
    return Object.assign(forOffline, addDataCreatorFn, {
      interceptInOffline: true,
      meta: {
        ...(addDataCreatorFn.meta || {}),
        name: 'addData' + Math.random(),
        retry: true,
        args: [],
      },
    });
  }
  return createOfflineThunk();
};

export const updateData = createAsyncThunk(
  'data/UPDATE_DATA',
  async ({ data, dataId, previousData }, { rejectWithValue }) => {
    const previousDataUuid = previousData?.uuid;

    try {
      const { farmFk: farmId } = data;
      const headers = { Authorization: await getToken() };
      await axios.patch(
        `${API_URL}/farms/${farmId}/data/${dataId}`,
        { data, previousDataUuid },
        { headers }
      );
      return;
    } catch (err) {
      console.error('ERROR:', err);
      return rejectWithValue('There was an error updating data');
    }
  }
);

export const deleteData = createAsyncThunk(
  'data/DELETE_DATA',
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
