import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      background: string;
      text: string;
      backgroundHover?: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      background?: string;
      backgroundHover?: string;
      text?: string;
    };
  }
}

export const darkTheme = createTheme({
  components: {
    MuiInputBase: {
      defaultProps: {},
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#333',
        }
      }
    }
  },
  colors: {
    text: '#fff',
    background: '#333',
    backgroundHover: '#555',
  },
});

export const lightTheme = createTheme({
  colors: {
    background: '#fff',
    backgroundHover: '#ddd',
    text: '#333',
  },
});
