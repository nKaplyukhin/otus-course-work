import React from 'react';
import { CategoryForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useGetCategoryQuery, useUpdateCategoryMutation } from 'store/rtk/categories';
import { ICategoryForm } from 'interfaces/form';
import { CircularProgress } from '@mui/material';
import { ICustomizedFetchBaseQueryError } from 'interfaces/server';
import { getBodyFromData } from './helpers';

interface IProps {
  closeModal: () => void;
  id: string | null;
  token: string;
}

export const CategoryModalWithId = ({ closeModal, id, token }: IProps) => {
  const { isLoading, data } = useGetCategoryQuery({ id, token });
  const [updateCategory, { error, isLoading: isLoadingAdd }] = useUpdateCategoryMutation();

  const { data: errorData } = (error as ICustomizedFetchBaseQueryError) || {};

  if (isLoading) {
    return <CircularProgress size={100} />;
  }

  const onSubmit = async (data: Partial<ICategoryForm>) => {
    const newData = await getBodyFromData(data, token);

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
      <CategoryForm
        submitError={errorData?.errors[0].message}
        isLoading={isLoadingAdd}
        onSubmit={onSubmit}
        values={id ? data : undefined}
      />
    </Modal>
  );
};
