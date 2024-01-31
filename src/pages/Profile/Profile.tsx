import styled from '@emotion/styled';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useModalController } from 'hooks/useModalController';
import React from 'react';
import { useGetProfileQuery } from 'store/rtk/profile';
import { ChangePasswordModal } from './ChangePasswordModal';
import { ChangeProfileDataModal } from './ChangeProfileDataModal';

const StyledBox = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

export const Profile = () => {
  const { data, isLoading, isSuccess } = useGetProfileQuery();
  const {
    isOpen: isChangePasswordOpen,
    handleOpen: changePasswordOpen,
    handleClose: changePasswordClose,
  } = useModalController();

  const {
    isOpen: isChangeProfileDataOpen,
    handleOpen: changeProfileDataOpen,
    handleClose: changeProfileDataClose,
  } = useModalController();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  return (
    data && (
      <StyledBox>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Имя пользователя: {data.name}
            </Typography>
            <Typography variant="h5"> Эл. почта: {data.email}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={changeProfileDataOpen} variant="outlined" size="small">
              Изменить данные
            </Button>
            <Button onClick={changePasswordOpen} variant="contained" size="small">
              Изменить пароль
            </Button>
          </CardActions>
        </Card>
        {isChangePasswordOpen && <ChangePasswordModal closeModal={changePasswordClose} />}
        {isChangeProfileDataOpen && (
          <ChangeProfileDataModal
            profileData={data}
            closeModal={changeProfileDataClose}
          />
        )}
      </StyledBox>
    )
  );
};
