import React, { FC } from 'react';
import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { getToken } from 'store/tokenSlice';
import { useAppDispatch } from 'store/hooks';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const LoginModal: FC<IProps> = ({ isOpen, closeModal }) => {
  const dispatch = useAppDispatch();
  return (
    <Modal visible={isOpen} onClose={closeModal}>
      <LoginForm
        onSubmit={(data) => {
          dispatch(getToken(data));
          closeModal()
        }}
      />
    </Modal>
  );
};
