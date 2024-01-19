import { Box } from '@mui/material';
import { IOperation } from 'interfaces/operation';
import React, { FC } from 'react';

interface IProps {
  operation: IOperation;
}
export const OperationCard: FC<IProps> = ({ operation }) => {
  console.log(operation);

  return <Box>asd</Box>;
};
