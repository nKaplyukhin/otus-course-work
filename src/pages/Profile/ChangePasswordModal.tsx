import React, { FC } from 'react';
import { ChangePasswordForm } from 'components/Forms/ChangePasswordForm';
import { Modal } from 'components/Modal';
import { useChangePasswordMutation } from 'store/rtk/profile';
import { ValidationErrorsResponse } from 'interfaces/store';
import { IChangePasswordForm } from 'interfaces/form';

interface IProps {
  closeModal: () => void;
}

export const ChangePasswordModal: FC<IProps> = ({ closeModal }) => {
  const [changePassword, { error }] = useChangePasswordMutation();

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
        submitError={(error as ValidationErrorsResponse)?.data.errors[0].message}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
