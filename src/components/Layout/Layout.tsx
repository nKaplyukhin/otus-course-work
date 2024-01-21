import React from 'react';
import { Header } from 'components/Header';
import { Box, styled } from '@mui/material';
import { createRandomOperation } from 'functions/operation';
import { OperationCard } from 'components/Cards/OperationCard';
import { Route, Routes } from 'react-router-dom';
import { Auth } from 'pages';

const LayoutContainer = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

export const Layout = () => {
  const operation = createRandomOperation('12-11-23');

  return (
    <LayoutContainer>
      <Header />
      <Routes>
        <Route Component={Auth} path="/auth" />
        <Route path="/" element={<OperationCard operation={operation} />} />
      </Routes>
    </LayoutContainer>
  );
};
