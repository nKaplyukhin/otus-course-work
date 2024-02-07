import React, { memo } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography, styled } from '@mui/material';
import { EOperation, IOperation } from 'interfaces/operation';
import { useNavigate } from 'react-router-dom';
import { getDateFromDateString } from 'utils/date';

const CategoryImage = styled('img')`
  width: 50px;
  height: 50px;
`;

const StyledItem = styled(Typography)`
  width: 100%;
`;

const StyledCardContent = styled(CardContent)`
  display: grid;
  grid-template-columns: 20% 50% 30%;
`;

const Amount = styled(Typography)`
  text-align: right;
  font-weight: bold;
`;

interface IProps {
  operation: IOperation;
}

export const ShortOperationCard = memo(({ operation }: IProps) => {
  const { category, name, desc, amount, type, id, createdAt } = operation;
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
          <StyledItem>Дата {getDateFromDateString(createdAt)}</StyledItem>
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
});

ShortOperationCard.displayName = 'ShortOperationCard';
