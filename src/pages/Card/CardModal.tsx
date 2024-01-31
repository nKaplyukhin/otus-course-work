import React, { FC } from 'react';
import { AddOperationForm } from 'components/Forms';
import { Modal } from 'components/Modal';

interface IProps {
  closeModal: () => void;
}

export const CardModal: FC<IProps> = ({ closeModal }) => (
  <Modal onClose={closeModal}>
    <AddOperationForm
      onSubmit={() => {
        // console.log(data);
      }}
    />
  </Modal>
);
