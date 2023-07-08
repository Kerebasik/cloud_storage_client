import axiosApiInstance from '../http/axios';
import {
  userLogInProps,
  userSignUpProps,
} from '../interfaces/httpRequestProps';
import { toast } from 'react-toastify';

class AuthHttpService {
  static login({ email, password }: userLogInProps) {
    return axiosApiInstance.post(
      '/auth/login',
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  static logout() {
    return axiosApiInstance.get('/auth/logout').catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  static signup({ email, password }: userSignUpProps) {
    return axiosApiInstance.post(
      '/auth/registration',
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}

export { AuthHttpService };
