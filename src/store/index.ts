import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import { operationsApi } from './rtk/operations';
import { profileApi } from './rtk/profile';

export const store = configureStore({
  reducer: {
    tokenReducer,
    [operationsApi.reducerPath]: operationsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(operationsApi.middleware, profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
