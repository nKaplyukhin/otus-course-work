import React, { FC } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInput {
  email: string;
  password: string;
}

interface IProps {
  onSubmit: SubmitHandler<IFormInput>;
}

const StyledForm = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const schema = yup.object({
  email: yup.string().email('valid').required('required'),
  password: yup.string().required('required').min(5, 'min'),
});

export const RegistrationForm: FC<IProps> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
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
      <Button variant="contained" type="submit">
        Зарегистрироваться
      </Button>
    </StyledForm>
  );
};
