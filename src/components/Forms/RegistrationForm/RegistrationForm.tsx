import React from 'react';
import { Box, Button, CircularProgress, TextField, Typography, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegistrationForm } from 'interfaces/form';
import { registrationSchema } from '../schemas';

interface IProps {
  onSubmit: (data: IRegistrationForm) => void;
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

export const RegistrationForm = ({ onSubmit, submitError, isLoading }: IProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  return (
    <StyledForm component="form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h5">Зарегистрироваться</Typography>
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
      <TextField
        error={!!errors?.passwordRepeat}
        helperText={errors?.passwordRepeat?.message}
        size="small"
        label="повторите пароль"
        type="password"
        {...register('passwordRepeat')}
      />
      <ErrorText>{submitError}</ErrorText>
      <Button variant="contained" type="submit">
        {isLoading && <CircularProgress sx={{ color: 'inherit' }} size={15} />} Зарегистрироваться
      </Button>
    </StyledForm>
  );
};
