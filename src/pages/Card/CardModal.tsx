import React, { FC } from 'react';
import { OperationForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useToken } from 'hooks/useToken';
import { useAddOperationMutation, useUpdateOperationMutation } from 'store/rtk/operations';
import { IOperationForm } from 'interfaces/form';
import { IOperation } from 'interfaces/operation';

interface IProps {
  closeModal: () => void;
  data?: IOperation;
}

export const CardModal: FC<IProps> = ({ closeModal, data }) => {
  const token = useToken();

  const [addOperation] = useAddOperationMutation();
  const [updateOperation] = useUpdateOperationMutation();

  const onSubmit = async (form: Partial<IOperationForm>) => {
    let res = null;

    if (data) {
      res = await updateOperation({
        body: form,
        id: data.id,
        token,
      });
    } else {
      res = await addOperation({
        body: form,
        token,
      });
    }
    if ('data' in res) {
      closeModal();
    }
  };

  return (
    <Modal onClose={closeModal}>
      <OperationForm onSubmit={onSubmit} values={data} />
    </Modal>
  );
};
