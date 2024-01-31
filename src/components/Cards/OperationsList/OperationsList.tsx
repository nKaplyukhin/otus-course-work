import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { ShortOperationCard } from '../ShortOperationCard';
import { useOperationsList } from './hooks/useOperationsList';

export const OperationsList = () => {
  const { isVisible, containerRef } = useIsVisible({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  const { isLoading, data, updatePage, isSuccess } = useOperationsList();

  useEffect(() => {
    if (isVisible) {
      updatePage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  return (
    <Stack spacing={2}>
      {data && data?.data.length ? (
        <>
          {data.data.map((item, index) => (
            <ShortOperationCard key={index} operation={item} />
          ))}
          <Box ref={containerRef} />
        </>
      ) : (
        <Typography>Ничего не найдено</Typography>
      )}
    </Stack>
  );
};
