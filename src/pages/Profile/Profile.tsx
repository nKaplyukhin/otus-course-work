import { Box, Typography } from '@mui/material';
import { CardModal } from 'pages/Card/CardModal';
import React from 'react';
import { useGetProfileQuery } from 'store/rtk/profile';

export const Profile = () => {
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return data && <Box>123123</Box>;
};
