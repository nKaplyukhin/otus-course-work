import React, { useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { LoginModal } from './LoginModal';
import { RegistrationModal } from './RegistrationModal';
import { addDefaults } from 'utils/other';

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
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegistrationModal, setIsRegistrationModal] = useState(false);

  const handleLoginClose = () => setIsLoginModal(false);
  const handleRegistrationClose = () => setIsRegistrationModal(false);

  const handleLoginOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    addDefaults(e);
    setIsLoginModal(true);
  };

  const handleRegistrationOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    addDefaults(e);
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
