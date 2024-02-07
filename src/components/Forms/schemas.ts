import * as yup from 'yup';
import { MIN_PASSWORD_LENGTH } from 'constansts/form';
import { EOperation } from 'interfaces/operation';

const emailField = yup.string().email('Неправильный e-mail').required('Обязательно для заполнения')
const nameField = yup.string().required('Обязательно для заполнения')
const passwordField = yup
  .string()
  .required('Обязательно для заполнения')
  .min(MIN_PASSWORD_LENGTH, `Минимум ${MIN_PASSWORD_LENGTH} символов`);
const passwordRepeatField = yup
  .string()
  .required('Обязательно для заполнения')
  .test((value, ctx) => {
    if (ctx.from && value !== ctx.from[0].value.password) {
      return ctx.createError({ message: 'Пароли не совпадают' });
    }
    return true;
  })

export const registrationSchema = yup.object({
  email: emailField,
  password: passwordField,
  passwordRepeat: passwordRepeatField,
});

export const loginSchema = yup.object({
  email: emailField,
  password: passwordField,
});

export const operationSchema = yup.object({
  amount: yup.number().positive('Должно быть > 0').required('Обязательно для заполнения'),
  name: yup.string().required('Обязательно для заполнения'),
  desc: yup.string(),
  categoryId: yup.string().required('Обязательно для заполнения'),
  type: yup.mixed<EOperation>().oneOf(Object.values(EOperation)),
});

export const changePasswordSchema = yup.object({
  password: passwordField,
  newPassword: passwordField,
});

export const changeProfileDataSchema = yup.object({
  name: nameField
});

export const categorySchema = yup.object({
  name: nameField,
  file: yup.mixed()
});