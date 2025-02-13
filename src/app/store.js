
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {apiSlice} from '../services/apiSlice';
import { combineReducers } from 'redux'; 
import authReducer from '../services/auth/authSlice';
import questionReducer from '../services/questionsSlice';

const persistConfig = {
    key: 'studyBuddy',
    storage,
  };

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  question : questionReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware)
});

setupListeners(store.dispatch);

export default store;

export const persistor = persistStore(store);