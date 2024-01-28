import React, { FC } from 'react';
import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { signin } from 'store/profileSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const LoginModal: FC<IProps> = ({ isOpen, closeModal }) => {
  const { loading, signinError: error, dispatchData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Modal visible={isOpen} onClose={closeModal}>
      <LoginForm
        isLoading={loading}
        submitError={error}
        onSubmit={(data, reset) => {
          dispatchData(signin(data)).then((response) => {
            if (response.payload.token) {
              closeModal();
              reset();
              navigate(location.state?.from || '/main');
            }
          });
        }}
      />
    </Modal>
  );
};
