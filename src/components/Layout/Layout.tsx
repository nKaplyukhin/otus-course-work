import React from 'react';
import { Header } from 'components/Header';
import { Box, styled } from '@mui/material';
import { ShortOperationCard } from 'components/Cards';
import { Modal } from 'components/Modal';
import { EOperation, IOperationShort } from 'interfaces/operation';
import { createRandomOperation } from 'functions/operation';

const LayoutContainer = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

export const Layout = () => {
  const operation = createRandomOperation('12-11-23');

  return (
    <LayoutContainer>
      <Header />
      <ShortOperationCard operation={operation} />
    </LayoutContainer>
  );
};
