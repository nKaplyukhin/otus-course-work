import React, { useState } from 'react';
import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { useToken } from 'hooks/useToken';
import { useGetOperationsQuery } from 'store/rtk/operations';
import { Chart } from 'components/Chart';
import { getSortedNamesAndAmountListOfOperations, getOperationsSortedOnType } from 'utils/operation';
import { EOperation } from 'interfaces/operation';

export const Total = () => {
  const [type, SetType] = useState<EOperation>(EOperation.Cost);

  const token = useToken();
  const { isLoading, isSuccess, data } = useGetOperationsQuery({ token });

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  const handleChange = (_: React.SyntheticEvent, newValue: EOperation) => {
    SetType(newValue);
  };

  const sortedData = getOperationsSortedOnType(data.data);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={type} onChange={handleChange}>
          {Object.values(EOperation).map((key) => (
            <Tab label={key} value={key} key={key} />
          ))}
        </Tabs>
      </Box>
      <Chart data={getSortedNamesAndAmountListOfOperations(sortedData[type])} />
    </Box>
  );
};
