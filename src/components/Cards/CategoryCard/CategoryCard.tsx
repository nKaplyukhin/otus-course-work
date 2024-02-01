import React, { FC, SyntheticEvent } from 'react';
import { Button, Paper, Typography, styled } from '@mui/material';
import { ICategory } from 'interfaces/category';
import { useDeleteCategoryMutation } from 'store/rtk/categories';
import { useToken } from 'hooks/useToken';

const StyledBox = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const StyledButtonContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface IProps {
  category: ICategory;
  onChangeClick: (e: SyntheticEvent<HTMLElement, Event>, id: string) => void;
}

export const CategoryCard: FC<IProps> = ({ category, onChangeClick }) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const token = useToken();

  const { name, id } = category;

  const handleClickDelete = () => {
    deleteCategory({ id, token });
  };

  return (
    <StyledBox>
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
  );
};
