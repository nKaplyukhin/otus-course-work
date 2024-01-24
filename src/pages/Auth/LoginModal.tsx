import React, { FC } from 'react';
import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { signin, selectTokenData } from 'store/profileSlice';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const LoginModal: FC<IProps> = ({ isOpen, closeModal }) => {
  const { loading, error } = useAppSelector(selectTokenData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Modal visible={isOpen} onClose={closeModal}>
      <LoginForm
        isLoading={loading}
        submitError={error}
        onSubmit={(data, reset) => {
          dispatch(signin(data)).then((response) => {
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
