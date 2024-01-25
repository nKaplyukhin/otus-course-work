import React, { FC } from 'react';
import { RegistrationForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { signup } from 'store/profileSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const RegistrationModal: FC<IProps> = ({ isOpen, closeModal }) => {
  const { loading, signupError: error, dispatchData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Modal visible={isOpen} onClose={closeModal}>
      <RegistrationForm
        isLoading={loading}
        submitError={error}
        onSubmit={(data, reset) => {
          dispatchData(signup(data)).then((response) => {
            if (response.payload.token) {
              closeModal();
              reset();
              navigate(location.state?.from || '/');
            }
          });
        }}
      />
    </Modal>
  );
};
