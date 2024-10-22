import { userAlova } from '../api';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  sucess: boolean;
  token: string;
  message: string;
}


export const userLogin = async (data: LoginFormData): Promise<UserLoginResponse> => {
  return await userAlova.Post('/api/users/login', data);
};


export interface registerFormData {
  email: string;
  password: string;
  password2: string;
}

export const userRegister = async (data: registerFormData): Promise<UserLoginResponse> => {
  return await userAlova.Post('/api/users/register', data);
};
