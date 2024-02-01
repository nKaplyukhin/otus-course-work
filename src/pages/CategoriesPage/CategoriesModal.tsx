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

interface IPropsWithToken {
  token: string;
}

interface ICategoryModalWithId extends IProps, IPropsWithToken {}
interface IategoryModalWithoutId extends Omit<IProps, 'id'>, IPropsWithToken {}

const CategoryModalWithId: FC<ICategoryModalWithId> = ({ closeModal, id, token }) => {
  const { isLoading, data } = useGetCategoryQuery({ id, token });
  const [updateCategory] = useUpdateCategoryMutation();

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  const onSubmit = async (data: Partial<ICategoryForm>) => {
    const res = await updateCategory({
      body: data,
      id,
      token,
    });
    if ('data' in res) {
      closeModal();
    }
  };

  return (
    <Modal onClose={closeModal}>
      <CategoryForm onSubmit={onSubmit} values={id ? data : undefined} />
    </Modal>
  );
};

const CategoryModalWithoutId: FC<IategoryModalWithoutId> = ({ closeModal, token }) => {
  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (data: Partial<ICategoryForm>) => {
    const res = await addCategory({
      body: data,
      token,
    });

    if ('data' in res) {
      closeModal();
    }
  };
  return (
    <Modal onClose={closeModal}>
      <CategoryForm onSubmit={onSubmit} />
    </Modal>
  );
};

export const CategoriesModal: FC<IProps> = ({ closeModal, id }) => {
  const token = useToken();

  if (!token) return <Typography>Не автроризован</Typography>;

  if (id) return <CategoryModalWithId token={token} closeModal={closeModal} id={id} />;
  return <CategoryModalWithoutId token={token} closeModal={closeModal} />;
};
