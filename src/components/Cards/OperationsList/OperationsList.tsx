import React, { FC, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { useToken } from 'hooks/useToken';
import { useGetOperationsQuery } from 'store/rtk/operations';
import { usePageSize } from 'hooks/usePageSize';
import { ISorting } from 'interfaces/sorting';
import { ShortOperationCard } from '../ShortOperationCard';

interface IProps {
  sorting: ISorting;
}
export const OperationsList: FC<IProps> = ({ sorting }) => {
  const { isVisible, containerRef } = useIsVisible({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });
  const token = useToken();
  const { pageSize, updatePage } = usePageSize();
  const { isLoading, data } = useGetOperationsQuery({ pageSize, token, sorting });

  useEffect(() => {
    if (isVisible) {
      updatePage(data?.pagination.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
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
