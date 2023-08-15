import authReducer, { logout } from '../../../features/auth/authSlice';
import { loginUser } from '../../../features/auth/authThunk';

describe('authSlice', () => {
  const initialState = {
    token: null,
    loading: false,
    errorMessage: '',
    loggedInUser: null,
  };

  it('initialises slice with initialState', () => {
    const authSliceInit = authReducer(undefined, { type: undefined });
    expect(authSliceInit).toEqual(initialState);
  });

  describe('logout', () => {
    it('should remove the token and logged in user from state', () => {
      const state = { ...initialState, token: 'token', loggedInUser: 'User' };
      const afterReducerOperation = authReducer(state, logout(state));

      expect(afterReducerOperation).toEqual(initialState);
    });
  });

  describe('loginUser', () => {
    it('should set loading to true and error message to an empty string when pending', async () => {
      const action = { type: loginUser.pending.type };
      const state = { ...initialState, errorMessage: 'error' };
      const afterReducerOperation = authReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        loading: true,
        errorMessage: '',
      });
    });

    it('should update the state correctly when login is fulfilled', async () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { token: 'token', user: 'User' },
      };
      const state = { ...initialState, loading: true };
      const afterReducerOperation = authReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        token: 'token',
        loggedInUser: 'User',
      });
    });
  });

  it('should set loading to true and error message to an empty string when rejected', async () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'There was an error',
    };
    const state = { ...initialState, loading: true };
    const afterReducerOperation = authReducer(state, action);
    expect(afterReducerOperation).toEqual({
      ...initialState,
      errorMessage: 'There was an error',
    });
  });
});
