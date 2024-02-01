import { Box, styled } from '@mui/material';
import { OperationsList } from 'components/Cards';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import { useToken } from 'hooks/useToken';
import { CardModal } from 'pages/Card/CardModal';
import React from 'react';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const Main = () => {
  const { isOpen, handleClose, handleOpen } = useModalController();
  const token = useToken();

  return (
    <StyledBox>
      {token && <FilterBar onAddClick={handleOpen} />}
      <OperationsList />
      {isOpen && <CardModal closeModal={handleClose} />}
    </StyledBox>
  );
};
