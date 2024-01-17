import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useInsertionEffect,
  useMemo,
  useState,
} from "react";
import { darkTheme, lightTheme } from "./theme";
import { Theme } from "./ThemeEnum";
import { ThemeProvider as ThemeProviderMUI } from "@mui/material";

interface IThemeContext {
  theme: Theme;
  changeTheme: () => void;
}

const KEY = "theme";

export const ThemeContext = React.createContext<IThemeContext>(
  {} as IThemeContext
);

export const useThemeContext = (): IThemeContext => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(KEY) as Theme) || Theme.light
  );

  useInsertionEffect(() => {
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const changeTheme = useCallback(
    () => setTheme((v) => (v === Theme.light ? Theme.dark : Theme.light)),
    []
  );

  const value = useMemo(() => ({ theme, changeTheme }), [changeTheme, theme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProviderMUI theme={theme === Theme.light ? lightTheme : darkTheme}>
        {children}
      </ThemeProviderMUI>
    </ThemeContext.Provider>
  );
};
