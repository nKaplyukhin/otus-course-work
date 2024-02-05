import React, { SyntheticEvent, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { usePageSize } from 'hooks/usePageSize';
import { ICategory } from 'interfaces/category';
import { CategoryCard } from '../CategoryCard';

interface IProps {
  onChangeClick: (e: SyntheticEvent<HTMLElement, Event>, id: string) => void;
  data: Array<ICategory>;
  total: number;
}

export const CategoriesList = ({ onChangeClick, data, total }: IProps) => {
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
