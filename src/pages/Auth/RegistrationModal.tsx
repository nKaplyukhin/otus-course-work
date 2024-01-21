import React from 'react';
import { RegistrationForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { FC } from 'react';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const RegistrationModal: FC<IProps> = ({ isOpen, closeModal }) => {
  return (
    <Modal visible={isOpen} onClose={closeModal}>
      <RegistrationForm />
    </Modal>
  );
};
