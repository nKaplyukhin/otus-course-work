import React from 'react';
import { CategoryForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useAddCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from 'store/rtk/categories';
import { ICategoryForm } from 'interfaces/form';
import { useToken } from 'hooks/useToken';
import { CircularProgress, Typography } from '@mui/material';
import { uploadImage } from 'utils/fetch';

interface IProps {
  closeModal: () => void;
  id: string | null;
}

interface IPropsWithToken {
  token: string;
}

interface ICategoryModalWithId extends IProps, IPropsWithToken {}
interface IategoryModalWithoutId extends Omit<IProps, 'id'>, IPropsWithToken {}

const CategoryModalWithId = ({ closeModal, id, token }: ICategoryModalWithId) => {
  const { isLoading, data } = useGetCategoryQuery({ id, token });
  const [updateCategory] = useUpdateCategoryMutation();

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  const onSubmit = async (data: Partial<ICategoryForm>) => {
    const newData: typeof data = {
      name: data.name,
    };

    if (data.file && token) {
      const { url } = await uploadImage(data.file, token);

      if (url) {
        newData.photo = url;
      }
    }

    const res = await updateCategory({
      body: newData,
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

const CategoryModalWithoutId = ({ closeModal, token }: IategoryModalWithoutId) => {
  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (data: Partial<ICategoryForm>) => {
    const newData: typeof data = {
      name: data.name,
    };

    console.log(data);

    if (data.file?.length && token) {
      const { url } = await uploadImage(data.file, token);
      console.log(url);

      if (url) {
        newData.photo = url;
      }
    }

    const res = await addCategory({
      body: newData,
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

export const CategoriesModal = ({ closeModal, id }: IProps) => {
  const token = useToken();

  if (!token) return <Typography>Не автроризован</Typography>;

  if (id) return <CategoryModalWithId token={token} closeModal={closeModal} id={id} />;
  return <CategoryModalWithoutId token={token} closeModal={closeModal} />;
};
