import React, { FC } from 'react';
import { RegistrationForm } from 'components/Forms';
import { Modal } from 'components/Modal';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const RegistrationModal: FC<IProps> = ({ isOpen, closeModal }) => (
  <Modal visible={isOpen} onClose={closeModal}>
    <RegistrationForm onSubmit={(data) => console.log(data)} />
  </Modal>
);
