import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createNetworkMiddleware,
  createReducer as createNetworkReducer,
  offlineActionTypes,
} from 'react-native-offline';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform,
  persistReducer,
  persistStore,
} from 'redux-persist';
import authReducer from '../features/auth/authSlice';
import dataReducer from '../features/data/dataSlice';
import farmsReducer from '../features/farms/farmsSlice';
import randomNamesReducer from '../features/randomNames/randomNamesSlice';
import regionsReducer from '../features/regions/regionsSlice';

const networkTransform = createTransform(
  (inboundState, key) => {
    console.log('**** INBOUND STATE ****');
    console.log(inboundState);
    const actionQueue = [];

    inboundState.actionQueue.forEach((action) => {
      if (typeof action === 'function') {
        actionQueue.push({
          function: action.meta.name,
          args: action.meta.args,
        });
      } else if (typeof action === 'object') {
        actionQueue.push(action);
      }
    });

    return { ...inboundState, actionQueue };
  },
  (outboundState, key) => {
    console.log('**** OUTBOUND STATE ****');
    console.log(outboundState);
    const actionQueue = [];

    outboundState.actionQueue.forEach((action) => {
      if (action.function) {
        const actionFunction = actions[action.function];
        actionQueue.push(actionFunction(...action.args));
      } else {
        actionQueue.push(action);
      }
    });

    return { ...outboundState, actionQueue };
  },

  { whitelist: ['network'] }
);

const comparisonFn = (action, actionQueue) => {
  console.log('***** COMPARISON FN *****');
  console.log('action:', action);
  console.log('actionQueue:', actionQueue);
  if (typeof action === 'function') {
    console.log('meta.name:', action.meta.name);
  }
};

const combinedReducer = combineReducers({
  authState: authReducer,
  farmsState: farmsReducer,
  dataState: dataReducer,
  regionsState: regionsReducer,
  randomNamesState: randomNamesReducer,
  network: createNetworkReducer(comparisonFn),
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
  transforms: [networkTransform],
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
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          ...Object.keys(offlineActionTypes).map(
            (type) => `@@network-connectivity/${type}`
          ),
        ],
        ignoredPaths: ['network.actionQueue'],
      },
    }).prepend(networkMiddleware),
});

export const persistor = persistStore(store);
