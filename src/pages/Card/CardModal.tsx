import React, { FC } from 'react';
import { AddOperationForm } from 'components/Forms';
import { Modal } from 'components/Modal';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const CardModal: FC<IProps> = ({ isOpen, closeModal }) => (
  <Modal visible={isOpen} onClose={closeModal}>
    <AddOperationForm
      onSubmit={(data, reset) => {
        console.log(data);
        // reset()
      }}
    />
  </Modal>
);
