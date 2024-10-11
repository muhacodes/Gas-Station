// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // ensure correct import path
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

// Import your slices

import AuthSlice from './Slice/Auth';


import ProductSlice from './Slice/ProductSlice';
import TankSlice  from './Slice/Tank';
import SalesSlice  from './Slice/Sales';




// Setup the configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can add a whitelist or blacklist to control what parts of your state are persisted
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: AuthSlice,
  product : ProductSlice,
  tank : TankSlice,
  sales: SalesSlice,
  
});

// Wrap the rootReducer with persistReducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
        // Optionally, ignore these paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Optionally, ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  // middleware and other store enhancers if any
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
