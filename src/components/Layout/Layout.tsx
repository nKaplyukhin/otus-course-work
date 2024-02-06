import React, { PropsWithChildren } from 'react';
import { Header } from 'components/Header';
import { Box, styled } from '@mui/material';
import { Container } from 'components/Container';

const LayoutContainer = styled(Box)`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Layout = ({ children }: PropsWithChildren) => (
  <LayoutContainer>
    <Header />
    <Box sx={{ padding: '20px 0' }}>
      <Container>{children}</Container>
    </Box>
  </LayoutContainer>
);
