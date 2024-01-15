import React from "react";
import { Header } from "./components/Header";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./theme/ThemeProvider";
import { GlobalStyles } from "./GlobalStyles";
import { LoginForm } from "components/Forms";

export const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <Header />
        <LoginForm />
      </ThemeProvider>
    </React.StrictMode>
  );
};
