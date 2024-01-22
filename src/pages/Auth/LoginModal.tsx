import React, { FC } from 'react';
import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const LoginModal: FC<IProps> = ({ isOpen, closeModal }) => (
  <Modal visible={isOpen} onClose={closeModal}>
    <LoginForm onSubmit={(data) => console.log(data)} />
  </Modal>
);
