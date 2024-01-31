import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import { operationsApi } from './rtk/operations';
import { profileApi } from './rtk/profile';
import { categoriesApi } from './rtk/categories';

export const store = configureStore({
  reducer: {
    tokenReducer,
    [operationsApi.reducerPath]: operationsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(operationsApi.middleware, profileApi.middleware, categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
