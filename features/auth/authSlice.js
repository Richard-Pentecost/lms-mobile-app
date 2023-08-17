import { createSlice } from '@reduxjs/toolkit';
import {
  getTokenPayload,
  isTokenValid,
  removeToken,
} from '../../utils/tokenManager';
import { loginUser } from './authThunk';

const initialState = {
  token: null,
  loading: false,
  errorMessage: '',
  loggedInUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
        state.loggedInUser = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { logout, authenticate } = authSlice.actions;

export const logoutUser = () => {
  return async (dispatch) => {
    removeToken();
    dispatch(logout());
  };
};

export const authenticateUser = () => {
  return async (dispatch) => {
    const token = await getTokenPayload();
    if (token && isTokenValid(token)) {
      dispatch(authenticate({ token }));
    }
  };
};

export default authSlice.reducer;
