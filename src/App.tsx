import React from 'react';
import { Header } from './components/Header';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme/ThemeProvider';
import { GlobalStyles } from './GlobalStyles';
import { LoginForm } from 'components/Forms';
import { Layout } from 'components/Layout';

export const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <Layout />
      </ThemeProvider>
    </React.StrictMode>
  );
};
