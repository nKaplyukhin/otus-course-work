import React from 'react';
import { CssBaseline } from '@mui/material';
import { Layout } from 'components/Layout';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { Navigation } from 'components/Navigation/Navigation';
import { ThemeProvider } from './theme/ThemeProvider';
import { GlobalStyles } from './GlobalStyles';

export const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <HashRouter>
          <Layout>
            <Navigation />
          </Layout>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
