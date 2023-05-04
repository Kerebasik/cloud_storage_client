import React, { FC, useState } from 'react';
import 'src/components/SignUp/SignUp.style.scss';
import axiosApiInstance from 'src/http/axios';
import { useNavigate } from 'react-router-dom';

const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlerOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosApiInstance
      .post(
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
      )
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        console.log('error axios');
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
      <div className="signup__container">
        <div className="signup__content">
          <form onSubmit={handlerOnSubmit}>
            <label className="form__title">Registration</label>
            <div className="input__email">
              <label>Enter your email</label>
              <input
                className="input"
                type="email"
                placeholder="email"
                onChange={handlerOnChangeEmail}
              />
            </div>
            <div className="input__password">
              <label>Enter password</label>
              <input
                type="password"
                className="input"
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

export default SignUp;
