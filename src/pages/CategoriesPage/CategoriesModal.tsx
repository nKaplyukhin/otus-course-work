import React, { FC } from 'react';
import { CategoryForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useAddCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from 'store/rtk/categories';
import { ICategoryForm } from 'interfaces/form';
import { useToken } from 'hooks/useToken';
import { Typography } from '@mui/material';

interface IProps {
  closeModal: () => void;
  id: string | null;
}

export const CategoriesModal: FC<IProps> = ({ closeModal, id }) => {
  const token = useToken();
  const { isLoading, data } = useGetCategoryQuery({ id, token });

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit = async (data: Partial<ICategoryForm>) => {
    let res = null;
    if (id) {
      res = await updateCategory({
        body: data,
        id,
        token,
      });
    } else {
      res = await addCategory({
        body: data,
        token,
      });
    }
    if ('data' in res) {
      closeModal();
    }
  };

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Modal onClose={closeModal}>
      <CategoryForm onSubmit={onSubmit} values={id ? data : undefined} />
    </Modal>
  );
};
