import { EOperation } from "./operation";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegistrationForm extends ILoginForm {
  passwordRepeat: string;
}

export interface IChangePasswordForm {
  password: string;
  newPassword: string;
}

export interface IOperationForm {
  amount: number;
  name: string;
  desc?: string;
  categoryId: string;
  type: EOperation;
}

export interface ICategoryForm {
  name: string;
  photo?: string;
}


export interface IChangeDataForm {
  name: string
}