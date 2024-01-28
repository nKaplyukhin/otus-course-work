import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stack, styled } from '@mui/material';

const mainMenu = [
  {
    link: '/main',
    text: 'Главная',
  },
  {
    link: '/profile',
    text: 'Профиль',
  },
];

const StyledNavLink = styled(NavLink)`
  &.active {
    color: red;
  }
`;

export const NavMenu = () => (
  <nav>
    <Stack direction="row" spacing={2}>
      {mainMenu.map((item, index) => (
        <StyledNavLink key={index} to={item.link}>
          {item.text}
        </StyledNavLink>
      ))}
    </Stack>
  </nav>
);
