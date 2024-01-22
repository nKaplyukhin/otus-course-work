import { Box, styled } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

const StyledBox = styled(Box)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

export const Container: FC<PropsWithChildren> = ({ children }) => <StyledBox>{children}</StyledBox>;
