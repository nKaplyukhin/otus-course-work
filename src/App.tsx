import React from 'react';
import { Header } from './components/Header';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme/ThemeProvider';
import { GlobalStyles } from './GlobalStyles';
import { LoginForm } from 'components/Forms';
import { Layout } from 'components/Layout';
import { Auth } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};
