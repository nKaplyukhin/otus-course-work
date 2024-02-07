import React from 'react';
import { useToken } from 'hooks/useToken';
import { Typography } from '@mui/material';
import { CategoryModalWithId } from './CategoryModalWithId';
import { CategoryModalWithoutId } from './CategoryModalWithoutId';

interface IProps {
  closeModal: () => void;
  id: string | null;
}

export const CategoriesModal = ({ closeModal, id }: IProps) => {
  const token = useToken();

  if (!token) return <Typography>Не автроризован</Typography>;

  if (id) return <CategoryModalWithId token={token} closeModal={closeModal} id={id} />;
  return <CategoryModalWithoutId token={token} closeModal={closeModal} />;
};
