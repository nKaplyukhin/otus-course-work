import React from 'react';
import { Header } from 'components/Header';
import { Box, styled } from '@mui/material';
import { createRandomOperation } from 'functions/operation';
import { OperationCard } from 'components/Cards/OperationCard';

const LayoutContainer = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

export const Layout = () => {
  const operation = createRandomOperation('12-11-23');

  return (
    <LayoutContainer>
      <Header />
      <OperationCard operation={operation} />
    </LayoutContainer>
  );
};
