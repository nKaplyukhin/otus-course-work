import React, { useEffect } from 'react';
import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { FC } from 'react';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const LoginModal: FC<IProps> = ({ isOpen, closeModal }) => {
  return (
    <Modal visible={isOpen} onClose={closeModal}>
      <LoginForm />
    </Modal>
  );
};
