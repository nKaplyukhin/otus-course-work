import React from 'react';
import { Box, Button, styled } from '@mui/material';
import { useModalController } from 'hooks/useModalController';
import { LoginModal } from './LoginModal';
import { RegistrationModal } from './RegistrationModal';

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  max-width: 200px;
  margin: 0 auto;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Auth = () => {
  const { isOpen: isLoginModal, handleOpen: handleLoginOpen, handleClose: handleLoginClose } = useModalController();
  const {
    isOpen: isRegistrationModal,
    handleOpen: handleRegistrationOpen,
    handleClose: handleRegistrationClose,
  } = useModalController();

  return (
    <Container>
      <StyledBox>
        <Button onClick={handleLoginOpen} variant="contained" color="primary">
          Войти
        </Button>
        <Button onClick={handleRegistrationOpen} variant="contained" color="secondary">
          Зарегистрироваться
        </Button>
      </StyledBox>
      {isLoginModal && <LoginModal closeModal={handleLoginClose} />}
      {isRegistrationModal && <RegistrationModal closeModal={handleRegistrationClose} />}
    </Container>
  );
};
