import { Button, Paper, styled } from '@mui/material';
import React from 'react';
import { Container } from '../Container';
import { useThemeContext } from '../../theme/ThemeProvider';
import { Modal } from 'components/Modal/Modal';

const StyledPaper = styled(Paper)`
  padding: 20px 0;
  border-radius: 0;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background};
`;
export const Header = () => {
  const { changeTheme } = useThemeContext();
  return (
    <StyledPaper elevation={3}>
      <Container>
        <Button onClick={changeTheme}>change theme</Button>
      </Container>
    </StyledPaper>
  );
};
