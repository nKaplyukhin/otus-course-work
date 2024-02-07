import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICategoryForm } from 'interfaces/form';
import { Box, Button, CircularProgress, TextField, Typography, styled } from '@mui/material';
import { InputFile } from 'components/Inputs';
import { categorySchema } from '../schemas';

const StyledForm = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

interface IProps {
  values?: ICategoryForm;
  onSubmit: (data: Partial<ICategoryForm>) => void;
  submitError?: string;
  isLoading?: boolean;
}

export const CategoryForm = ({ values, submitError, isLoading, onSubmit }: IProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: values,
    resolver: yupResolver(categorySchema),
  });
  const buttonText = values ? 'Редактирование' : 'Создание';

  return (
    <StyledForm component="form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h5">{buttonText}</Typography>
      <TextField
        error={!!errors?.name}
        helperText={errors?.name?.message}
        label="название*"
        size="small"
        defaultValue={values?.name || ''}
        type="text"
        {...register('name')}
      />
      <InputFile defaultValue={values?.photo} register={register('file')} />
      <ErrorText>{submitError}</ErrorText>
      <Button variant="contained" type="submit">
        {isLoading && <CircularProgress sx={{ color: 'inherit' }} size={15} />} {buttonText}
      </Button>
    </StyledForm>
  );
};
