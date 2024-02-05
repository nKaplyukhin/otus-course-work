import { Box, CircularProgress, MenuItem, Select, SelectChangeEvent, Typography, styled } from '@mui/material';
import { OperationsList } from 'components/Cards';
import { FilterBar } from 'components/FilterBar';
import { useModalController } from 'hooks/useModalController';
import { useSorting } from 'hooks/useSorting';
import { EOperation } from 'interfaces/operation';
import { CardModal } from 'pages/Card/CardModal';
import React from 'react';
import { useFilteredData } from './hooks/useFilteredData';
import { FILTER_ALL } from './constants';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

const operationWithAll = {
  all: 'Все',
  ...EOperation,
};

export const Main = () => {
  const { isOpen, handleClose, handleOpen } = useModalController();
  const { isLoading, isSuccess, data, changeSorting, setTypeSorting, total } = useFilteredData();

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  const handleChangeTypeSort = (e: SelectChangeEvent<string>) => {
    setTypeSorting(e.target.value);
  };

  return (
    <StyledBox>
      <FilterBar
        onAddClick={handleOpen}
        onChangeSorting={changeSorting}
        other={
          <Select onChange={handleChangeTypeSort} label="Тип" size="small" defaultValue={FILTER_ALL}>
            {Object.keys(operationWithAll).map((key) => (
              <MenuItem key={key} value={key}>
                {operationWithAll[key]}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <OperationsList data={data} total={total} />
      {isOpen && <CardModal closeModal={handleClose} />}
    </StyledBox>
  );
};
