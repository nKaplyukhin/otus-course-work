import React, { FC, SyntheticEvent } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, styled } from '@mui/material';
import { EOperation, IOperation } from 'interfaces/operation';
import { useNavigate } from 'react-router-dom';

const StyledCardContent = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledCardActions = styled(CardActions)`
  background-color: ${({ theme }) => theme.colors.background};
`;

interface IProps {
  operation: IOperation;
  onChangeClick: (e: SyntheticEvent<HTMLElement, Event>) => void;
}

export const OperationCard: FC<IProps> = ({ operation, onChangeClick }) => {
  const { category, name, desc, amount, type, id } = operation;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Card>
      {category?.photo ? (
        <CardMedia sx={{ height: 140, backgroundSize: 'contain' }} image={category.photo} />
      ) : (
        <Typography variant="h5">{category?.name}</Typography>
      )}

      <StyledCardContent>
        <Box>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="body2">{desc}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5" color={type === EOperation.Cost ? 'green' : 'red'}>
          {amount}
        </Typography>
      </StyledCardContent>
      <StyledCardActions>
        <Button variant="outlined" onClick={handleBackClick} size="small">
          Назад
        </Button>
        <Button onClick={onChangeClick} variant="contained" size="small">
          Изменить
        </Button>
        <Button variant="contained" color="error" size="small">
          Удалить
        </Button>
      </StyledCardActions>
    </Card>
  );
};
