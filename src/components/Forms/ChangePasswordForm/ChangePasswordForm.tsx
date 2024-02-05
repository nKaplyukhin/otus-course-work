import React from 'react';
import { Box, Button, CircularProgress, TextField, Typography, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IChangePasswordForm } from 'interfaces/form';
import { changePasswordSchema } from '../schemas';

interface IProps {
  onSubmit: (data: IChangePasswordForm) => void;
  submitError?: string;
  isLoading?: boolean;
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

export const ChangePasswordForm = ({ onSubmit, submitError, isLoading }: IProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  return (
    <StyledForm component="form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h5">Изменить пароль</Typography>
      <TextField
        error={!!errors?.password}
        helperText={errors?.password?.message}
        size="small"
        label="пароль"
        type="password"
        {...register('password')}
      />
      <TextField
        error={!!errors?.newPassword}
        helperText={errors?.newPassword?.message}
        size="small"
        label="новый пароль"
        type="password"
        {...register('newPassword')}
      />
      <ErrorText>{submitError}</ErrorText>
      <Button variant="contained" type="submit">
        {isLoading && <CircularProgress sx={{ color: 'inherit' }} size={15} />} Изменить
      </Button>
    </StyledForm>
  );
};
