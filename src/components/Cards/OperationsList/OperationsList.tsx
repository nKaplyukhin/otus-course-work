import React from 'react';
import { Box, Stack } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';

export const OperationsList = () => {
  const targetRef = React.useRef(null);

  const isVisible = useIsVisible(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    targetRef
  );

  return (
    <Stack spacing={2}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box ref={targetRef} />
    </Stack>
  );
};
