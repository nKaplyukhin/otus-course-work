import { Box, styled } from '@mui/material';
import { CategoriesList } from 'components/Cards/CategoriesList';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useSorting } from 'hooks/useSorting';
import { CategoriesModal } from './CategoriesModal';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const CategoriesPage = () => {
  const { isOpen, handleClose, handleOpen } = useModalController();
  const [id, setId] = useState<string | null>(null);
  const [sorting, changeSorting] = useSorting();

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

  return (
    <StyledBox>
      <FilterBar onChangeSorting={changeSorting} onAddClick={onOpenClick} />
      <CategoriesList onChangeClick={onChangeClick} sorting={sorting} />
      {isOpen && <CategoriesModal id={id} closeModal={handleClose} />}
    </StyledBox>
  );
};
