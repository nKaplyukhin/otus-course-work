import { Box, CircularProgress, Typography, styled } from '@mui/material';
import { OperationsList } from 'components/Cards';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import { useSorting } from 'hooks/useSorting';
import { useToken } from 'hooks/useToken';
import { CardModal } from 'pages/Card/CardModal';
import React from 'react';
import { useGetOperationsQuery } from 'store/rtk/operations';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const Main = () => {
  const { isOpen, handleClose, handleOpen } = useModalController();
  const [sorting, changeSorting] = useSorting();
  const token = useToken();

  const { isLoading, data, isSuccess } = useGetOperationsQuery({ token, sorting });

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  return (
    <StyledBox>
      <FilterBar onAddClick={handleOpen} onChangeSorting={changeSorting} />
      <OperationsList data={data.data} total={data.pagination.total} />
      {isOpen && <CardModal closeModal={handleClose} />}
    </StyledBox>
  );
};
