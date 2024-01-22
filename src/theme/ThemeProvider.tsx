import React, { PropsWithChildren, useCallback, useContext, useInsertionEffect, useMemo, useState } from 'react';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { ETheme } from './ThemeEnum';

interface IThemeContext {
  theme: ETheme;
  changeTheme: () => void;
}

const KEY = 'theme';

export const ThemeContext = React.createContext<IThemeContext>({} as IThemeContext);

export const useThemeContext = (): IThemeContext => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ETheme>(() => (localStorage.getItem(KEY) as ETheme) || ETheme.light);

  useInsertionEffect(() => {
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const changeTheme = useCallback(() => setTheme((v) => (v === ETheme.light ? ETheme.dark : ETheme.light)), []);

  const value = useMemo(() => ({ theme, changeTheme }), [changeTheme, theme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProviderMUI theme={theme === ETheme.light ? lightTheme : darkTheme}>{children}</ThemeProviderMUI>
    </ThemeContext.Provider>
  );
};
