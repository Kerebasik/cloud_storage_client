import axiosApiInstance from '../../http/axios';

interface userLogInProps {
  email: string;
  password: string;
}

export const userLogIn = async ({ email, password }: userLogInProps) => {
  return await axiosApiInstance.post(
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
};
