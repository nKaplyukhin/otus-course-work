import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useThemeContext } from 'theme/ThemeProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ETheme } from 'theme/ThemeEnum';

export const ChangeThemeButton = () => {
  const { theme, changeTheme } = useThemeContext();

  return (
    <Tooltip title="Изменить тему" arrow>
      <IconButton onClick={changeTheme}>
        {theme === ETheme.light ? <DarkModeIcon /> : <LightModeIcon style={{ color: 'white' }} />}
      </IconButton>
    </Tooltip>
  );
};
