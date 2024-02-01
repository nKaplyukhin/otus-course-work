import React, { FC, SyntheticEvent } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, styled } from '@mui/material';
import { EOperation, IOperation } from 'interfaces/operation';
import { useNavigate } from 'react-router-dom';
import { useToken } from 'hooks/useToken';
import { getDateFromDateString } from 'utils/date';

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
  onDeleteClick: () => void;
}

export const OperationCard: FC<IProps> = ({ operation, onChangeClick, onDeleteClick }) => {
  const { category, name, desc, amount, type, createdAt } = operation;
  const navigate = useNavigate();
  const token = useToken();

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
          <Typography variant="body2">Дата {getDateFromDateString(createdAt)}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5" color={type === EOperation.Cost ? 'green' : 'red'}>
          {amount}
        </Typography>
      </StyledCardContent>
      <StyledCardActions>
        <Button variant="outlined" onClick={handleBackClick} size="small">
          Назад
        </Button>
        {token && (
          <>
            <Button onClick={onChangeClick} variant="contained" size="small">
              Изменить
            </Button>
            <Button onClick={onDeleteClick} variant="contained" color="error" size="small">
              Удалить
            </Button>
          </>
        )}
      </StyledCardActions>
    </Card>
  );
};
