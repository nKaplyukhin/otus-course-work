import React from 'react';
import { CssBaseline } from '@mui/material';
import { Layout } from 'components/Layout';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Navigation } from 'components/Navigation/Navigation';
import { ThemeProvider } from './theme/ThemeProvider';
import { GlobalStyles } from './GlobalStyles';

export const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <BrowserRouter>
          <Layout>
            <Navigation />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
