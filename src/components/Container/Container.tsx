import { Box, styled } from '@mui/material';
import React, { PropsWithChildren } from 'react';

const StyledBox = styled(Box)`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
`;

export const Container = ({ children }: PropsWithChildren) => <StyledBox>{children}</StyledBox>;
