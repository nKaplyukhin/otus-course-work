import { Box, styled } from '@mui/material';
import { CategoriesList } from 'components/Cards/CategoriesList';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useToken } from 'hooks/useToken';
import { CategoriesModal } from './CategoriesModal';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const CategoriesPage = () => {
  const { isOpen, handleClose, handleOpen } = useModalController();
  const [id, setId] = useState<string | null>(null);
  const token = useToken();

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
      {token && <FilterBar onAddClick={onOpenClick} />}
      <CategoriesList onChangeClick={onChangeClick} />
      {isOpen && <CategoriesModal id={id} closeModal={handleClose} />}
    </StyledBox>
  );
};
