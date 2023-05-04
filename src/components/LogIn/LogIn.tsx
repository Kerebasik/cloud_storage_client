import React, { FC, useState } from 'react';
import axiosApiInstance from 'src/http/axios';
import { useNavigate } from 'react-router-dom';

import 'src/components/LogIn/LogIn.style.scss';
import { AxiosResponse } from 'axios';
import { ITokens } from 'src/models/ITokens';

const LogIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlerOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
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
          <form onSubmit={handlerOnSubmit}>
            <label className="form__title">Log In</label>
            <div className="input__email">
              <label>Enter your email</label>
              <input
                className="input"
                type="email"
                placeholder="email"
                value={email}
                onChange={handlerOnChangeEmail}
              />
            </div>
            <div className="input__password">
              <label>Enter password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={handlerOnChangePassword}
                placeholder="password"
              />
            </div>
            <div className={'input__button'}>
              <button type="submit" onSubmit={handlerOnSubmit}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
