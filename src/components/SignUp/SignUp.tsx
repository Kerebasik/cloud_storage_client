import React, { FC, useState } from 'react';
import 'src/components/SignUp/SignUp.style.scss';
import axiosApiInstance from 'src/http/axios';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormSignUpInput } from 'src/interfaces/componentsProps';
import { FormattedMessage } from 'react-intl';

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
            <label className="form__title">
              <FormattedMessage id={'signup.title'} />
            </label>
            <div className="input__email">
              <label>
                <FormattedMessage id={'signup.email.label'} />
              </label>
              {errors.email?.message === 'emailIsRequired' && (
                <div className={'input__email_alert'}>
                  <p>
                    <FormattedMessage id={'signup.email.errors.required'} />
                  </p>
                </div>
              )}
              {errors.email?.message === 'invalidEmailAddress' && (
                <div className={'input__email_alert'}>
                  <p>
                    <FormattedMessage
                      id={'signup.email.errors.invalidEmailAddress'}
                    />
                  </p>
                </div>
              )}
              <input
                className="input"
                type="email"
                {...register('email', {
                  required: { value: true, message: 'emailIsRequired' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalidEmailAddress',
                  },
                })}
                placeholder="email"
                onChange={handlerOnChangeEmail}
              />
            </div>
            <div className="input__password">
              <label>
                <FormattedMessage id={'signup.password.label'} />
              </label>
              {errors.password?.message === 'passwordIsRequired' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage id={'signup.password.errors.required'} />
                  </p>
                </div>
              )}
              {errors.password?.message === 'passwordNotValid' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage id={'signup.password.errors.notValid'} />
                  </p>
                </div>
              )}
              {errors.password?.message === 'minimum6Charters' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage
                      id={'signup.password.errors.minCharters'}
                    />
                  </p>
                </div>
              )}
              {errors.password?.message === 'maximum20Charters' && (
                <div className={'input__password_alert'}>
                  <p>
                    <FormattedMessage
                      id={'signup.password.errors.maxCharters'}
                    />
                  </p>
                </div>
              )}
              <input
                type="password"
                className="input"
                {...register('password', {
                  required: { value: true, message: 'passwordIsRequired' },
                  minLength: { value: 6, message: 'minimum6Charters' },
                  maxLength: { value: 20, message: 'maximum20Charters' },
                  pattern: {
                    value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                    message: 'passwordNotValid',
                  },
                })}
                onChange={handlerOnChangePassword}
                placeholder="password"
              />
            </div>
            <div className={'input__button'}>
              <button type="submit">
                <FormattedMessage id={'signup.button.send'} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
