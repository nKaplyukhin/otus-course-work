import React from 'react';
import { Box, CircularProgress, Typography, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { OperationCard } from 'components/Cards';
import { useDeleteOperationMutation, useGetOperationQuery } from 'store/rtk/operations';
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
  const { data, isLoading, isSuccess } = useGetOperationQuery({ id: id!, token });
  const [deleteOperation] = useDeleteOperationMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  const handleClickDelete = () => {
    if (id) {
      deleteOperation({ id, token });
      navigate('/');
    }
  };

  return (
    data && (
      <StyledBox>
        <OperationCard onDeleteClick={handleClickDelete} operation={data} onChangeClick={handleOpen} />
        {isOpen && <CardModal closeModal={handleClose} data={data} />}
      </StyledBox>
    )
  );
};
