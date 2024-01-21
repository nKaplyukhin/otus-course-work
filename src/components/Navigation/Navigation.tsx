import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/profile'}>Профиль</NavLink>
        </li>
        <li>
          <NavLink to={'/'}>Главная</NavLink>
        </li>
        <li>
          <NavLink to={'/auth'}>Авторизация</NavLink>
        </li>
      </ul>
    </nav>
  );
};
