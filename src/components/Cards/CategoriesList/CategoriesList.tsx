import React, { FC, SyntheticEvent, useEffect } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { useToken } from 'hooks/useToken';
import { useGetCategoriesQuery } from 'store/rtk/categories';
import { usePageSize } from 'hooks/usePageSize';
import { ISorting } from 'interfaces/sorting';
import { CategoryCard } from '../CategoryCard';

interface IProps {
  onChangeClick: (e: SyntheticEvent<HTMLElement, Event>, id: string) => void;
  sorting: ISorting;
}

export const CategoriesList: FC<IProps> = ({ onChangeClick, sorting }) => {
  const { isVisible, containerRef } = useIsVisible({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });
  const token = useToken();
  const { pageSize, updatePage } = usePageSize();
  const { isLoading, data, isSuccess } = useGetCategoriesQuery({ pageSize, token, sorting });

  useEffect(() => {
    if (isVisible) {
      updatePage(data?.pagination.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  return (
    <Stack spacing={2}>
      {data && data?.data.length ? (
        <>
          {data.data.map((item, index) => (
            <CategoryCard key={index} category={item} onChangeClick={onChangeClick} />
          ))}
          <Box ref={containerRef} />
        </>
      ) : (
        <Typography>Ничего не найдено</Typography>
      )}
    </Stack>
  );
};
