import { Box, CircularProgress, Typography, styled } from '@mui/material';
import { CategoriesList } from 'components/Cards/CategoriesList';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useSorting } from 'hooks/useSorting';
import { useGetCategoriesQuery } from 'store/rtk/categories';
import { useToken } from 'hooks/useToken';
import { CategoriesModal } from './CategoriesModal';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const CategoriesPage = () => {
  const [id, setId] = useState<string | null>(null);
  const [sorting, changeSorting] = useSorting();
  const token = useToken();
  const { isOpen, handleClose, handleOpen } = useModalController();

  const { isLoading, data, isSuccess } = useGetCategoriesQuery({ token, sorting });

  const onChangeClick = useCallback(
    (e: SyntheticEvent<HTMLElement, Event>, id: string) => {
      setId(id);
      handleOpen(e);
    },
    [handleOpen]
  );

  const onOpenClick = (e: SyntheticEvent<HTMLElement, Event>) => {
    setId(null);
    handleOpen(e);
  };

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  return (
    <StyledBox>
      <FilterBar onChangeSorting={changeSorting} onAddClick={onOpenClick} />
      <CategoriesList data={data.data} onChangeClick={onChangeClick} total={data.pagination.total} />
      {isOpen && <CategoriesModal id={id} closeModal={handleClose} />}
    </StyledBox>
  );
};
