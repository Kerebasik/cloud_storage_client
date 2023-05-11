import React, { FC, useState } from 'react';
import axiosApiInstance from 'src/http/axios';
import { useNavigate } from 'react-router-dom';
import 'src/components/LogIn/LogIn.style.scss';
import { AxiosResponse } from 'axios';
import { ITokens } from 'src/models/ITokens';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormLogInInput } from 'src/interfaces/componentsProps';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
            <label className="form__title">
              <FormattedMessage id={'login.title'} />
            </label>
            <div className="input__email">
              <label>
                <FormattedMessage id={'login.email.label'} />
              </label>
              {errors.email?.message === 'emailIsRequired' && (
                <div className={'input__email_alert'}>
                  <p>
                    <FormattedMessage id={'login.email.errors.required'} />
                  </p>
                </div>
              )}
              {errors.email?.message === 'invalidEmailAddress' && (
                <div className={'input__email_alert'}>
                  <p>
                    <FormattedMessage
                      id={'login.email.errors.invalidEmailAddress'}
                    />
                  </p>
                </div>
              )}
              <input
                {...register('email', {
                  required: { value: true, message: 'emailIsRequired' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalidEmailAddress',
                  },
                })}
                className="input"
                type="email"
                placeholder="email"
                value={email}
                onChange={handlerOnChangeEmail}
              />
            </div>
            <div className="input__password">
              <label>
                <FormattedMessage id={'login.password.label'} />
              </label>
              {errors.password?.message === 'passwordIsRequired' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage id={'login.password.errors.required'} />
                  </p>
                </div>
              )}
              {errors.password?.message === 'passwordNotValid' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage id={'login.password.errors.notValid'} />
                  </p>
                </div>
              )}
              {errors.password?.message === 'minimum6Charters' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage
                      id={'login.password.errors.minCharters'}
                    />
                  </p>
                </div>
              )}
              {errors.password?.message === 'maximum20Charters' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage
                      id={'login.password.errors.maxCharters'}
                    />
                  </p>
                </div>
              )}
              <input
                type="password"
                {...register('password', {
                  required: { value: true, message: 'passwordIsRequired' },
                  minLength: { value: 6, message: 'minimum6Charters' },
                  maxLength: { value: 20, message: 'maximum20Charters' },
                  pattern: {
                    value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                    message: 'passwordNotValid',
                  },
                })}
                className="input"
                value={password}
                onChange={handlerOnChangePassword}
                placeholder="password"
              />
            </div>
            <div className={'input__button'}>
              <button type="submit" formNoValidate>
                <FormattedMessage id={'login.button.send'} />
              </button>
            </div>
          </form>
          <hr />
          <div className={'login__text'}>
            <p>
              <FormattedMessage id={'login.text.or'} />
            </p>
          </div>
          <div className={'login__button_signup'}>
            <Link to={'/signup'}>
              <button>
                <FormattedMessage id={'login.button.signup'} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
