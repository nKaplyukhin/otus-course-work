import { Box, styled } from '@mui/material';
import { OperationsList } from 'components/Cards';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import { useSorting } from 'hooks/useSorting';
import { CardModal } from 'pages/Card/CardModal';
import React from 'react';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const Main = () => {
  const { isOpen, handleClose, handleOpen } = useModalController();
  const [sorting, changeSorting] = useSorting();

  return (
    <StyledBox>
      <FilterBar onAddClick={handleOpen} onChangeSorting={changeSorting} />
      <OperationsList sorting={sorting} />
      {isOpen && <CardModal closeModal={handleClose} />}
    </StyledBox>
  );
};
