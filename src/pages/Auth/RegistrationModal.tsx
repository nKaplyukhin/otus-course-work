import React from 'react';
import { RegistrationForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { signup } from 'store/tokenSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRegistrationForm } from 'interfaces/form';
import { useAuth } from './hooks/useAuth';

interface IProps {
  closeModal: () => void;
}
export const RegistrationModal = ({ closeModal }: IProps) => {
  const { loading, signupError: error, dispatchData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data: IRegistrationForm) => {
    dispatchData(signup(data)).then((response) => {
      if (response.payload.token) {
        closeModal();
        navigate(location.state?.from || '/main');
      }
    });
  };

  return (
    <Modal onClose={closeModal}>
      <RegistrationForm isLoading={loading} submitError={error} onSubmit={onSubmit} />
    </Modal>
  );
};
