import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stack } from '@mui/material';

const mainMenu = [
  {
    link: '/',
    text: 'Главная',
  },
  {
    link: '/profile',
    text: 'Профиль',
  },
  {
    link: '/auth',
    text: 'Авторизация',
  },
];

export const NavMenu = () => (
  <nav>
    <Stack direction="row" spacing={2}>
      {mainMenu.map((item, index) => (
        <NavLink key={index} to={item.link}>
          {item.text}
        </NavLink>
      ))}
    </Stack>
  </nav>
);
