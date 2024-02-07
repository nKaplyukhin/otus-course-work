import React from 'react';
import { CategoryForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useAddCategoryMutation } from 'store/rtk/categories';
import { ICategoryForm } from 'interfaces/form';
import { getBodyFromData } from './helpers';

interface IProps {
  closeModal: () => void;
  token: string;
}

export const CategoryModalWithoutId = ({ closeModal, token }: IProps) => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const onSubmit = async (data: Partial<ICategoryForm>) => {
    const newData = await getBodyFromData(data, token);

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
      <CategoryForm isLoading={isLoading} onSubmit={onSubmit} />
    </Modal>
  );
};
