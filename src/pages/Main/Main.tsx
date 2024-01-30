import { Box, styled } from '@mui/material';
import { OperationsList } from 'components/Cards';
import React from 'react';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const Main = () => (
  <StyledBox>
    <OperationsList />
  </StyledBox>
);
