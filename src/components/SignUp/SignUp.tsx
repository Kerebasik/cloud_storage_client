import React, { FC, useState } from 'react';
import 'src/components/SignUp/SignUp.style.scss';
import axiosApiInstance from 'src/http/axios';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormSignUpInput } from 'src/interfaces/componentsProps';

const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormSignUpInput>();

  const handlerOnSubmit: SubmitHandler<IFormSignUpInput> = () => {
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
          <form onSubmit={handleSubmit(handlerOnSubmit)}>
            <label className="form__title">Registration</label>
            <div className="input__email">
              <label>Enter your email</label>
              {errors.email?.type === 'required' && (
                <p role="alert">Email is required</p>
              )}
              <input
                className="input"
                type="email"
                {...register('email', {
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })}
                placeholder="email"
                onChange={handlerOnChangeEmail}
              />
            </div>
            <div className="input__password">
              <label>Enter password</label>
              {errors.password?.type === 'required' && (
                <p role="alert">Password is required</p>
              )}
              <input
                type="password"
                className="input"
                {...register('password', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /(?=.*d)(?=.*[a-z])(?=.*[A-Z])/,
                })}
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

export default SignUp;
