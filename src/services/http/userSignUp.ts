import axiosApiInstance from '../../http/axios';

interface userSignUpProps {
  email: string;
  password: string;
}

export const userSignUp = ({ email, password }: userSignUpProps) => {
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
};
