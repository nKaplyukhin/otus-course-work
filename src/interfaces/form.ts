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

export interface IAddOperationForm {
  amount: number;
  name: string;
  desc: string;
  category: string;
  type: EOperation;
  file: FileList;
}

export interface ICategoryForm {
  name: string;
  photo?: string;
}


export interface IChangeDataForm {
  name: string
}