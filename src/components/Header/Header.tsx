import { Box, Paper, styled } from '@mui/material';
import React from 'react';
import { ChangeThemeButton, LoginButtton } from 'components/Buttons';
import { NavMenu } from 'components/NavMenu';

import { Container } from '../Container';

const StyledPaper = styled(Paper)`
  padding: 20px 0;
  border-radius: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.background};
`;

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = () => (
  <StyledPaper elevation={3}>
    <Container>
      <HeaderContainer>
        <NavMenu />
        <Box>
          <ChangeThemeButton />
          <LoginButtton />
        </Box>
      </HeaderContainer>
    </Container>
  </StyledPaper>
);
