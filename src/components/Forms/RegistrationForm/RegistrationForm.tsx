import React, { FC } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { UseFormReset, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IRegistrationForm } from 'types/form';
import { MIN_PASSWORD_LENGTH } from 'constansts/form';

interface IProps {
  onSubmit: (data: IRegistrationForm, reset: UseFormReset<IRegistrationForm>) => void;
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

const schema = yup.object({
  email: yup.string().email('Неправильный e-mail').required('Обязательно для заполнения'),
  password: yup
    .string()
    .required('Обязательно для заполнения')
    .min(MIN_PASSWORD_LENGTH, `Минимум ${MIN_PASSWORD_LENGTH} символов`),
  passwordRepeat: yup
    .string()
    .required('required')
    .test((value, ctx) => {
      if (ctx.from && value !== ctx.from[0].value.password) {
        return ctx.createError({ message: 'Пароли не совпадают' });
      }
      return true;
    }),
});

export const RegistrationForm: FC<IProps> = ({ onSubmit, submitError, isLoading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <StyledForm component="form" onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
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
        {isLoading && '2'} Зарегистрироваться
      </Button>
    </StyledForm>
  );
};
