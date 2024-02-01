import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { OperationCard } from 'components/Cards';
import { useGetOperationQuery } from 'store/rtk/operations';
import { useModalController } from 'hooks/useModalController';
import { useToken } from 'hooks/useToken';
import { CardModal } from './CardModal';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const Card = () => {
  const { isOpen, handleOpen, handleClose } = useModalController();
  const { id } = useParams();
  const token = useToken();
  const { data, isLoading } = useGetOperationQuery({ id: id!, token });

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    data && (
      <StyledBox>
        <OperationCard operation={data} onChangeClick={handleOpen} />
        {isOpen && <CardModal closeModal={handleClose} data={data} />}
      </StyledBox>
    )
  );
};
