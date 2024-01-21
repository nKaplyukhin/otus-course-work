import { LoginForm } from 'components/Forms';
import { Modal } from 'components/Modal';
import React, { useState } from 'react';
import { LoginModal } from './LoginModal';
import { RegistrationModal } from './RegistrationModal';
import { Box, Button, styled } from '@mui/material';

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 200px;
  height: 100vh;
  margin: auto;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Auth = () => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegistrationModal, setIsRegistrationModal] = useState(false);

  const handleLoginClose = () => setIsLoginModal(false);
  const handleRegistrationClose = () => setIsRegistrationModal(false);

  const handleLoginOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsLoginModal(true);
  };

  const handleRegistrationOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsRegistrationModal(true);
  };

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
      <LoginModal isOpen={isLoginModal} closeModal={handleLoginClose} />
      <RegistrationModal isOpen={isRegistrationModal} closeModal={handleRegistrationClose} />
    </Container>
  );
};
