// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import authReducer from '../features/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { movieApi } from '../services/movieApi';
import { userApi } from '../services/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    [authApi.reducerPath]: authApi.reducer, 
    [movieApi.reducerPath]: movieApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
                  .concat(authApi.middleware)
                  .concat(movieApi.middleware) 
                  .concat(userApi.middleware) 
});


setupListeners(store.dispatch);
