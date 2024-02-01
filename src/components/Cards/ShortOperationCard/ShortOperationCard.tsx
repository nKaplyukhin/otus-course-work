import React, { FC } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography, styled } from '@mui/material';
import { EOperation, IOperation } from 'interfaces/operation';
import { useNavigate } from 'react-router-dom';

const CategoryImage = styled('img')`
  border: 1px solid red;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StyledItem = styled(Typography)`
  width: 100%;
`;

const StyledCardContent = styled(CardContent)`
  display: grid;
  grid-template-columns: 20% 50% 30%;
`;

const Amount = styled(Typography)<{ color: string }>`
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

  // console.log(category);

  return (
    <Card>
      <StyledCardContent>
        <Box>
          {category?.photo && <CategoryImage src={category.photo} />}
          <Typography variant="body2">{category?.name}</Typography>
        </Box>
        <Box>
          <StyledItem variant="h5">{name}</StyledItem>
          <StyledItem>{desc}</StyledItem>
        </Box>
        <Amount variant="h4" color={type === EOperation.Cost ? 'green' : 'red'}>
          {amount}
        </Amount>
      </StyledCardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={handleClick}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};
