import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      background: string;
      text: string;
      loader: string
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      background?: string;
      text?: string;
      loader?: string
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
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: '#333',
          color: "#fff"
        }
      }
    }
  },
  colors: {
    text: '#fff',
    background: '#333',
  },
});

export const lightTheme = createTheme({
  colors: {
    background: '#fff',
    text: '#333',
  },
});
