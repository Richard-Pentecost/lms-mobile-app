import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createNetworkMiddleware,
  reducer as network,
} from 'react-native-offline';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import authReducer from '../features/auth/authSlice';
import dataReducer from '../features/data/dataSlice';
import farmsReducer from '../features/farms/farmsSlice';
import regionsReducer from '../features/regions/regionsSlice';

const combinedReducer = combineReducers({
  authState: authReducer,
  farmsState: farmsReducer,
  dataState: dataReducer,
  regionsState: regionsReducer,
  network,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logoutUser') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  networkMiddleware,
});

export const persistor = persistStore(store);
