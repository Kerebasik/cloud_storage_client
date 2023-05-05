import React, { FC, useState } from 'react';
import axiosApiInstance from 'src/http/axios';
import { useNavigate } from 'react-router-dom';
import 'src/components/LogIn/LogIn.style.scss';
import { AxiosResponse } from 'axios';
import { ITokens } from 'src/models/ITokens';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormLogInInput } from 'src/interfaces/componentsProps';

const LogIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormLogInInput>();

  const handlerOnSubmit: SubmitHandler<IFormLogInInput> = async () => {
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
                <p role={'alert'}>Email is required</p>
              )}
              <input
                {...register('email', {
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })}
                className="input"
                type="email"
                placeholder="email"
                value={email}
                onChange={handlerOnChangeEmail}
              />
            </div>
            <div className="input__password">
              <label>Enter password</label>
              {errors.password?.type === 'required' && (
                <p role={'alert'}>Password is required</p>
              )}
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /(?=.*d)(?=.*[a-z])(?=.*[A-Z])/,
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
