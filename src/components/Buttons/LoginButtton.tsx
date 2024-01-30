import React from 'react';
import { IconButton, Tooltip, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from 'store/tokenSlice';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from 'store/hooks';
import { useToken } from 'hooks/useToken';

const StyledIcon = styled(IconButton)`
  color: ${({ theme }) => theme.colors.text};
`;

export const LoginButtton = () => {
  const navigate = useNavigate();
  const token = useToken();
  const dispatch = useAppDispatch();

  return token ? (
    <Tooltip title="Выйти">
      <StyledIcon
        onClick={() => {
          dispatch(logout());
        }}
      >
        <LogoutIcon />
      </StyledIcon>
    </Tooltip>
  ) : (
    <Tooltip title="Войти">
      <StyledIcon onClick={() => navigate('/auth')}>
        <LoginIcon />
      </StyledIcon>
    </Tooltip>
  );
};
