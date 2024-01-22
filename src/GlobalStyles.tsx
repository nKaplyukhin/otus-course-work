import React from 'react';
import { GlobalStyles as GlobalStyleMUI } from '@mui/material';

export const GlobalStyles = () => {
  return (
    <GlobalStyleMUI
      styles={(theme) => ({
        body: {
          margin: 0,
          fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif`,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
        },
        ul: {
          padding: 0,
          listStyle: 'none',
        },
        a: {
          color: theme.colors.text,
          textDecoration: 'none',
        },
      })}
    />
  );
};
