import React from 'react';
import { Header } from 'components/Header';
import { Box, styled } from '@mui/material';

const LayoutContainer = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

export const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
    </LayoutContainer>
  );
};
