import React, { FC } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IChangeDataForm } from 'interfaces/form';
import { IProfileData } from 'interfaces/profile';
import { changeProfileDataSchema } from '../schemas';

interface IProps {
  onSubmit: (data: IChangeDataForm) => void;
  submitError?: string;
  isLoading?: boolean;
  profileData: IProfileData;
}

const StyledForm = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ErrorText = styled(Typography)`
  padding: 0;
  position: absolute;
  bottom: 75px;
  color: #d32f2f;
  font-size: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const ChangeProfileDataForm: FC<IProps> = ({ onSubmit, submitError, isLoading, profileData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(changeProfileDataSchema),
  });

  return (
    <StyledForm component="form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h5">Изменить данные</Typography>
      <TextField
        error={!!errors?.name}
        helperText={errors?.name?.message}
        defaultValue={profileData.name}
        size="small"
        label="имя"
        type="text"
        {...register('name')}
      />
      <ErrorText>{submitError}</ErrorText>
      <Button variant="contained" type="submit">
        {isLoading && '2'} Изменить
      </Button>
    </StyledForm>
  );
};
