import { Box, Button, Paper, styled } from '@mui/material';
import React from 'react';
import { Container } from '../Container';
import { ChangeThemeButton } from 'components/Buttons';
import { NavMenu } from 'components/NavMenu';

const StyledPaper = styled(Paper)`
  padding: 20px 0;
  border-radius: 0;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background};
`;

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = () => {
  return (
    <StyledPaper elevation={3}>
      <Container>
        <HeaderContainer>
          <NavMenu />
          <ChangeThemeButton />
        </HeaderContainer>
      </Container>
    </StyledPaper>
  );
};
