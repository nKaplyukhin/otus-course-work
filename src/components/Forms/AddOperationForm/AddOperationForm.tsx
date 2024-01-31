import React, { FC } from 'react';
import { UseFormReset, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EOperation } from 'interfaces/operation';
import { Box, Button, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IAddOperationForm } from 'interfaces/form';
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

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

interface IProps {
  values?: IAddOperationForm;
  onSubmit: (data: Partial<IAddOperationForm>) => void;
  submitError?: string;
  isLoading?: boolean;
}

export const AddOperationForm: FC<IProps> = ({ values, submitError, isLoading, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: values,
    resolver: yupResolver(addOperationSchema),
  });
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
      <TextField
        error={!!errors?.category}
        helperText={errors?.category?.message}
        label="категория"
        size="small"
        type="text"
        {...register('category')}
      />
      <Select size="small" defaultValue={EOperation.Cost} {...register('type')}>
        {Object.values(EOperation).map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>
      {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} {...register('file')}>
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button> */}
      <ErrorText>{submitError}</ErrorText>
      <Button variant="contained" type="submit">
        {isLoading && '2'} {buttonText}
      </Button>
    </StyledForm>
  );
};
