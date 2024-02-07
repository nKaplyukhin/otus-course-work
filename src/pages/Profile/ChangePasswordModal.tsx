import React from 'react';
import { ChangePasswordForm } from 'components/Forms/ChangePasswordForm';
import { Modal } from 'components/Modal';
import { useChangePasswordMutation } from 'store/rtk/profile';
import { ValidationErrorsResponse } from 'interfaces/store';
import { IChangePasswordForm } from 'interfaces/form';

interface IProps {
  closeModal: () => void;
}

export const ChangePasswordModal = ({ closeModal }: IProps) => {
  const [changePassword, { error, isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: IChangePasswordForm) => {
    const res = await changePassword(data);
    if ('error' in res) {
      return;
    }
    closeModal();
  };

  return (
    <Modal onClose={closeModal}>
      <ChangePasswordForm
        isLoading={isLoading}
        submitError={(error as ValidationErrorsResponse)?.data.errors[0].message}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
