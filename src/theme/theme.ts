import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      background: string;
      text: string;
    };
    palette: {
      primary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      background?: string;
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
          color: "#fff",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
  colors: {
    text: "#fff",
    background: "#333",
  },
});

export const lightTheme = createTheme({
  colors: {
    background: "#fff",
    text: "#333",
  },
});
