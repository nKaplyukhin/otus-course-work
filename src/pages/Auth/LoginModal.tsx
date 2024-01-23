import React, { FC } from 'react';
import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getToken, selectTokenData } from 'store/tokenSlice';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const LoginModal: FC<IProps> = ({ isOpen, closeModal }) => {
  const { loading, error } = useAppSelector(selectTokenData);
  const dispatch = useAppDispatch();

  return (
    <Modal visible={isOpen} onClose={closeModal}>
      <LoginForm
        isLoading={loading}
        submitError={error}
        onSubmit={(data) => {
          dispatch(getToken(data)).then((response) => {
            if (response.payload.token) {
              closeModal();
            }
          });
        }}
      />
    </Modal>
  );
};
