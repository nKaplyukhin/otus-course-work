import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './profileSlice';
import { operationsApi } from './operations';

export const store = configureStore({
  reducer: {
    tokenReducer,
    [operationsApi.reducerPath]: operationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(operationsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
