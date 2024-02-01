import { Box, styled } from '@mui/material';
import { OperationsList } from 'components/Cards';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import { useToken } from 'hooks/useToken';
import { CardModal } from 'pages/Card/CardModal';
import React, { SyntheticEvent, useState } from 'react';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const Main = () => {
  const { isOpen, handleClose, handleOpen } = useModalController();
  const token = useToken();
  const [id, setId] = useState<string | null>(null);

  // const onChangeClick = (e: SyntheticEvent<HTMLElement, Event>, id: string) => {
  //   setId(id);
  //   handleOpen(e);
  // };

  const onOpenClick = (e: SyntheticEvent<HTMLElement, Event>) => {
    setId(null);
    handleOpen(e);
  };
  return (
    <StyledBox>
      {token && <FilterBar onAddClick={onOpenClick} />}
      <OperationsList />
      {isOpen && <CardModal closeModal={handleClose} />}
    </StyledBox>
  );
};
