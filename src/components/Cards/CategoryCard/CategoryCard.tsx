import React, { SyntheticEvent, memo } from 'react';
import { Button, Paper, Typography, styled } from '@mui/material';
import { ICategory } from 'interfaces/category';
import { useDeleteCategoryMutation } from 'store/rtk/categories';
import { useToken } from 'hooks/useToken';
import { NavLink } from 'react-router-dom';
import { addDefaults } from 'utils/other';
import { Image } from '@mui/icons-material';

const StyledBox = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledButtonContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface IProps {
  category: ICategory;
  onChangeClick: (e: SyntheticEvent<HTMLElement, Event>, id: string) => void;
}

export const CategoryCard = memo(({ category, onChangeClick }: IProps) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const token = useToken();

  const { name, id, photo } = category;

  const handleClickDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    addDefaults(e);
    deleteCategory({ id, token });
  };

  return (
    <NavLink to={`/main?category=${id}`}>
      <StyledBox>
        {photo && <img src={photo} alt={name} />}
        <Typography variant="body2">{name}</Typography>
        {token && (
          <StyledButtonContainer>
            <Button onClick={(e) => onChangeClick(e, id)} size="small" variant="outlined">
              Изменить
            </Button>
            <Button onClick={handleClickDelete} size="small" variant="outlined" color="error">
              Удалить
            </Button>
          </StyledButtonContainer>
        )}
      </StyledBox>
    </NavLink>
  );
});

CategoryCard.displayName = 'CategoryCard';
