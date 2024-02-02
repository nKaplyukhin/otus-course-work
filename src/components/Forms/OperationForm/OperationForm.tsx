import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EOperation, IOperation } from 'interfaces/operation';
import { Box, Button, CircularProgress, Select, TextField, Typography, styled } from '@mui/material';
import { IOperationForm } from 'interfaces/form';
import { useGetCategoriesQuery } from 'store/rtk/categories';
import { useToken } from 'hooks/useToken';
import { addOperationSchema } from '../schemas';

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
  values?: IOperation;
  onSubmit: (data: Partial<IOperationForm>) => void;
  submitError?: string;
  isLoading?: boolean;
}

export const OperationForm: FC<IProps> = ({ values, submitError, isLoading, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { ...values, categoryId: values?.category.id },
    resolver: yupResolver(addOperationSchema),
  });
  const token = useToken();
  const { data } = useGetCategoriesQuery({ token });
  const buttonText = values ? 'Редактирование' : 'Создание';

  return (
    <StyledForm component="form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h5">{buttonText}</Typography>
      <TextField
        error={!!errors?.name}
        helperText={errors?.name?.message}
        label="название"
        size="small"
        type="text"
        {...register('name')}
      />
      <TextField
        error={!!errors?.amount}
        helperText={errors?.amount?.message}
        label="стоимость"
        size="small"
        type="number"
        {...register('amount')}
        defaultValue={values?.amount || 0}
        inputProps={{
          min: 0,
        }}
      />
      <TextField
        error={!!errors?.desc}
        helperText={errors?.desc?.message}
        label="описание"
        size="small"
        type="text"
        {...register('desc')}
      />
      {data?.data ? (
        <Select native size="small" defaultValue={data.data[0].id} {...register('categoryId')}>
          {data.data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
      ) : (
        <Typography>Ничего не найдено</Typography>
      )}
      <Select native size="small" defaultValue={EOperation.Cost} {...register('type')}>
        {Object.values(EOperation).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <ErrorText>{submitError}</ErrorText>
      <Button variant="contained" type="submit">
      {isLoading && <CircularProgress sx={{ color: 'inherit' }} size={15} />}  {buttonText}
      </Button>
    </StyledForm>
  );
};
