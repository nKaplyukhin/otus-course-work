import React, { FC, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { usePageSize } from 'hooks/usePageSize';
import { IOperation } from 'interfaces/operation';
import { ShortOperationCard } from '../ShortOperationCard';

interface IProps {
  data: Array<IOperation>;
  total: number;
}
export const OperationsList: FC<IProps> = ({ data, total }) => {
  const { isVisible, containerRef } = useIsVisible({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });
  const { pageSize, updatePage } = usePageSize();

  useEffect(() => {
    if (isVisible) {
      updatePage(total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const pagingData = data.slice(0, pageSize);

  return (
    <Stack spacing={2}>
      {pagingData.length ? (
        <>
          {pagingData.map((item, index) => (
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
