import React, { FC } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { EOperation, IOperation } from 'interfaces/operation';

const CardContainer = styled(Box)`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;
  transition: background-color 0.3s ease-out;
  padding: 10px;
  /* &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  } */
`;

const CategoryConatiner = styled(Box)``;
const CategoryImage = styled('img')`
  border: 1px solid red;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StyledItem = styled(Typography)`
  width: 100%;
`;

const Amount = styled(Typography)<{ color: string }>`
  width: 100%;
  text-align: right;
  font-weight: bold;
`;

interface IProps {
  operation: IOperation;
}

export const ShortOperationCard: FC<IProps> = ({ operation }) => {
  const { category, name, desc, amount, type } = operation;

  return (
    <CardContainer>
      <CategoryConatiner>
        {category?.photo ? <CategoryImage src={category.photo} /> : <StyledItem>{category?.name}</StyledItem>}
      </CategoryConatiner>
      <Box>
        <StyledItem variant="h5">{name}</StyledItem>
        <StyledItem>{desc}</StyledItem>
      </Box>
      <Amount variant="h4" color={type === EOperation.Cost ? 'green' : 'red'}>
        {amount}
      </Amount>
    </CardContainer>
  );
};
