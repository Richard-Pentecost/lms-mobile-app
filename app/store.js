import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import farmsReducer from '../features/farms/farmsSlice';
import regionsReducer from '../features/regions/regionsSlice';

const combinedReducer = combineReducers({
  authState: authReducer,
  farmsState: farmsReducer,
  regionsState: regionsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logoutUser') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
