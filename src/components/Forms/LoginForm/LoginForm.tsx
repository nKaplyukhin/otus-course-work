import React from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IFormInput {
  email: string;
  password: string;
}

const StyledForm = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const schema = yup.object({
  email: yup.string().email("valid").required("required"),
  password: yup.string().required("required").min(5, "min"),
});

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <StyledForm component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors?.email}
        helperText={errors?.email?.message}
        label="e-mail"
        size="small"
        type="text"
        {...register("email")}
      />
      <TextField
        error={!!errors?.password}
        helperText={errors?.password?.message}
        size="small"
        label="пароль"
        type="password"
        {...register("password")}
      />
      <Button variant="contained" type="submit">
        Войти
      </Button>
    </StyledForm>
  );
};
