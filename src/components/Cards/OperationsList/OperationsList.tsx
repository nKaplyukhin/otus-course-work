import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useGetOperationsQuery } from 'store/operations';
import { ShortOperationCard } from '../ShortOperationCard';
// import { useIsVisible } from 'hooks/useIsVisible';

export const OperationsList = () => {
  const targetRef = React.useRef(null);
  const { isLoading, data } = useGetOperationsQuery();

  // const isVisible = useIsVisible(
  //   {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0,
  //   },
  //   targetRef
  // );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  console.log(data);

  return (
    <Stack spacing={2}>
      {data && data.data.map((item, index) => <ShortOperationCard key={index} operation={item} />)}
      <Box ref={targetRef} />
    </Stack>
  );
};
