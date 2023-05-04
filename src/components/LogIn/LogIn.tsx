import React, { FC, useState } from 'react';
import axiosApiInstance from 'src/http/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'src/components/LogIn/LogIn.style.scss';
import { AxiosResponse } from 'axios';
import { ITokens } from 'src/models/ITokens';
import { ILogInFormInput, NavigatePath } from 'src/interfaces/componentsProps';

const LogIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogInFormInput>();

  const handlerOnSubmit: SubmitHandler<ILogInFormInput> = async () => {
    await axiosApiInstance
      .post(
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
      )
      .then((response: AxiosResponse<ITokens>) => {
        localStorage.setItem('token', response.data.accessToken);
        setEmail('');
        setPassword('');
        const path: NavigatePath = location?.state?.from;
        console.log(path);
        navigate(-1);
      });
  };

  const handlerOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlerOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="login__container">
        <div className="login__content">
          <form onSubmit={handleSubmit(handlerOnSubmit)}>
            <label className="form__title">Log In</label>
            <div className="input__email">
              <label>Enter your email</label>
              {errors.email?.type === 'required' && (
                <p role="alert">First name is required</p>
              )}
              <input
                className="input"
                {...register('email', {
                  required: true,
                  pattern:
                    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                })}
                type="email"
                placeholder="email"
                value={email}
                onChange={handlerOnChangeEmail}
              />
            </div>
            <div className="input__password">
              <label>Enter password</label>
              {errors.email?.type === 'required' && (
                <p role="alert">First name is required</p>
              )}
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
                className="input"
                value={password}
                onChange={handlerOnChangePassword}
                placeholder="password"
              />
            </div>
            <div className={'input__button'}>
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
