import React, { FC } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { EOperation, IOperation } from 'interfaces/operation';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled(Box)`
  display: grid;
  grid-template-columns: 20% 50% 30%;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  min-height: 200px;
  margin: auto;
  align-items: center;
  transition: background-color 0.3s ease-out;
  padding: 10px;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.5);
`;

const StyledButton = styled(Button)`
  grid-column: 3/4;
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
  const { category, name, desc, amount, type, id } = operation;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${id}`);
  };

  return (
    <CardContainer>
      <CategoryConatiner>
        {category?.photo && <CategoryImage src={category.photo} />}
        <Typography variant="body2">{category?.name}</Typography>
      </CategoryConatiner>
      <Box>
        <StyledItem variant="h5">{name}</StyledItem>
        <StyledItem>{desc}</StyledItem>
      </Box>
      <Amount variant="h4" color={type === EOperation.Cost ? 'green' : 'red'}>
        {amount}
      </Amount>
      <StyledButton variant="outlined" onClick={handleClick}>
        Подробнее
      </StyledButton>
    </CardContainer>
  );
};
