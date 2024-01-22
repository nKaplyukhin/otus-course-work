import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme/ThemeProvider';
import { GlobalStyles } from './GlobalStyles';
import { Layout } from 'components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

export const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <CssBaseline />
          <GlobalStyles />
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
