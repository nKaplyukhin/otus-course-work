import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { usePageSize } from 'hooks/usePageSize';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';

interface IProps {
  isLoading: boolean;
  data: Array<any>;
  total: number;
  RenderItem: ReactElement;
}

export const List: FC<PropsWithChildren<>> = ({ isLoading, data, total, RenderItem }: IProps) => {
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

  if (isLoading) {
    return <CircularProgress size={100} />;
  }
  const pagingData = data.slice(pageSize - 1);

  return (
    <Stack spacing={2}>
      {pagingData && pagingData.length ? (
        <>
          {pagingData.map((item, index) => (
            <RenderItem key={index} operation={item} />
          ))}
          <Box ref={containerRef} />
        </>
      ) : (
        <Typography>Ничего не найдено</Typography>
      )}
    </Stack>
  );
};
