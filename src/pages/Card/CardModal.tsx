import React from 'react';
import { OperationForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useToken } from 'hooks/useToken';
import { useAddOperationMutation, useUpdateOperationMutation } from 'store/rtk/operations';
import { IOperationForm } from 'interfaces/form';
import { IOperation } from 'interfaces/operation';
import { ICustomizedFetchBaseQueryError } from 'interfaces/server';

interface IProps {
  closeModal: () => void;
  data?: IOperation;
}

export const CardModal = ({ closeModal, data }: IProps) => {
  const token = useToken();

  const [addOperation, { error: addError, isLoading: isAddLoading }] = useAddOperationMutation();
  const [updateOperation, { error: updateError, isLoading: isUpdateLoading }] = useUpdateOperationMutation();

  const { data: addErrorData } = (addError as ICustomizedFetchBaseQueryError) || {};
  const { data: updateErrorData } = (updateError as ICustomizedFetchBaseQueryError) || {};

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
      <OperationForm
        submitError={data ? updateErrorData?.errors[0].message : addErrorData?.errors[0].message}
        isLoading={data ? isUpdateLoading : isAddLoading}
        onSubmit={onSubmit}
        values={data}
      />
    </Modal>
  );
};
