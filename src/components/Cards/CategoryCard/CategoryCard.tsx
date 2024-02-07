import React, { SyntheticEvent, memo } from 'react';
import { Box, Button, Card, CardActions, CardContent, Paper, Typography, styled } from '@mui/material';
import { ICategory } from 'interfaces/category';
import { useDeleteCategoryMutation } from 'store/rtk/categories';
import { useToken } from 'hooks/useToken';
import { NavLink, useNavigate } from 'react-router-dom';
import { addDefaults } from 'utils/other';

const StyledBox = styled(CardContent)`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-gap: 5%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface IProps {
  category: ICategory;
  onChangeClick: (e: SyntheticEvent<HTMLElement, Event>, id: string) => void;
}

export const CategoryCard = memo(({ category, onChangeClick }: IProps) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const token = useToken();
  const navigate = useNavigate();

  const { name, id, photo } = category;

  const handleClickDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    addDefaults(e);
    deleteCategory({ id, token });
  };

  return (
    <Card>
      <StyledBox>
        <Box>{photo && <img height="100%" src={photo} alt={name} />}</Box>
        <Typography variant="body2">{name}</Typography>
      </StyledBox>
      {token && (
        <CardActions>
          <Button variant="contained" onClick={(e) => onChangeClick(e, id)} size="small">
            Изменить
          </Button>
          <Button variant="contained" onClick={handleClickDelete} size="small" color="error">
            Удалить
          </Button>
          <Button onClick={() => navigate(`/main?category=${id}`)} size="small" variant="outlined">
            Перейти к операциям
          </Button>
        </CardActions>
      )}
    </Card>
  );
});

CategoryCard.displayName = 'CategoryCard';
