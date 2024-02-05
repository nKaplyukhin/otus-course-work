import React from 'react';
import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { signin } from 'store/tokenSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ILoginForm } from 'interfaces/form';
import { useAuth } from './hooks/useAuth';

interface IProps {
  closeModal: () => void;
}

export const LoginModal = ({ closeModal }: IProps) => {
  const { loading, signinError: error, dispatchData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data: ILoginForm) => {
    dispatchData(signin(data)).then((response) => {
      if (response.payload.token) {
        closeModal();
        navigate(location.state?.from || '/main');
      }
    });
  };

  return (
    <Modal onClose={closeModal}>
      <LoginForm isLoading={loading} submitError={error} onSubmit={onSubmit} />
    </Modal>
  );
};
