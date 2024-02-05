import React from 'react';
import { Box, Button, CircularProgress, TextField, Typography, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginForm } from 'interfaces/form';
import { loginSchema } from '../schemas';
// import { getToken } from 'store/tokenSlice';

interface IProps {
  onSubmit: (data: ILoginForm) => void;
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

export const LoginForm = ({ onSubmit, submitError, isLoading }: IProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <StyledForm component="form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h5">Войти</Typography>
      <TextField
        error={!!errors?.email}
        helperText={errors?.email?.message}
        label="e-mail"
        size="small"
        type="text"
        {...register('email')}
      />
      <TextField
        error={!!errors?.password}
        helperText={errors?.password?.message}
        size="small"
        label="пароль"
        type="password"
        {...register('password')}
      />
      <ErrorText>{submitError}</ErrorText>
      <Button variant="contained" type="submit">
        {isLoading && <CircularProgress sx={{ color: 'inherit' }} size={15} />} Войти
      </Button>
    </StyledForm>
  );
};
