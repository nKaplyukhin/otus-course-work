import styled from '@emotion/styled';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useModalController } from 'hooks/useModalController';
import React from 'react';
import { useGetProfileQuery } from 'store/rtk/profile';
import { ProfileCard } from 'components/Cards/ProfileCard';
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
    return <CircularProgress size={100} />;
  }

  if (!isSuccess) {
    return <Typography>Произошла ошибка</Typography>;
  }

  return (
    data && (
      <StyledBox>
        <ProfileCard onChangeDataClick={changeProfileDataOpen} onChangePasswordClick={changePasswordOpen} data={data} />
        {isChangePasswordOpen && <ChangePasswordModal closeModal={changePasswordClose} />}
        {isChangeProfileDataOpen && <ChangeProfileDataModal profileData={data} closeModal={changeProfileDataClose} />}
      </StyledBox>
    )
  );
};
