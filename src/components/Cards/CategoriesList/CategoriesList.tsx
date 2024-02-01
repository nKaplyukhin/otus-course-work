import React, { FC, SyntheticEvent, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useIsVisible } from 'hooks/useIsVisible';
import { useCategoriesList } from './hooks/useCategoriesList';
import { CategoryCard } from '../CategoryCard';
import { ScrollRestoration } from 'react-router-dom';

interface IProps {
  onChangeClick: (e: SyntheticEvent<HTMLElement, Event>, id: string) => void;
}

export const CategoriesList: FC<IProps> = ({ onChangeClick }) => {
  const { isVisible, containerRef } = useIsVisible({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  const { isLoading, data, updatePage, isSuccess } = useCategoriesList();

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
