import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { ShortOperationCard } from '../ShortOperationCard';
import { useOperationsList } from './hooks/useOperationsList.1';

export const OperationsList = () => {
  const { isVisible, containerRef } = useIsVisible({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  const { isLoading, data, updatePage } = useOperationsList();

  useEffect(() => {
    if (isVisible) {
      updatePage();
    }
  }, [isVisible]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={2}>
      {data && data.data.map((item, index) => <ShortOperationCard key={index} operation={item} />)}
      {data && <Box ref={containerRef} />}
    </Stack>
  );
};
