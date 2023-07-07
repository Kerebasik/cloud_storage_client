import axiosApiInstance from "../http/axios";
import { userLogInProps, userSignUpProps } from "../interfaces/httpRequestProps";

class AuthHttpService{
  static login({ email, password }: userLogInProps){
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

  static logout(){
    return axiosApiInstance.get('/auth/logout');
  }

  static signup({ email, password }: userSignUpProps){
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

export {AuthHttpService}