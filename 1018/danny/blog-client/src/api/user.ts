import { userAlova } from '../api';

interface LoginFormData {
  username: string;
  password: string;
}

interface UserLoginResponse {
  sucess: boolean;
  token: string;
  message: string;
}


export const userLogin = async (data: LoginFormData): Promise<UserLoginResponse> => {
  return await userAlova.Post('/api/users/login', data);
};


export type { LoginFormData, UserLoginResponse };
