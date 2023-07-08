import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'src/components/pages/LogIn/LogIn.style.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormLogInInput } from 'src/interfaces/componentsProps';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'src/hooks/useAuth';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchUser } from '../../../store/reducers/actionCreator';
import { toast } from 'react-toastify';
import { LocationState } from '../../../interfaces/states';
import { AuthHttpService } from '../../../services/authHttpService';

const LogIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation() as LocationState;
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormLogInInput>();

  const handlerOnSubmit: SubmitHandler<IFormLogInInput> = async () => {
    AuthHttpService.login({ email, password })
      .then(() => {
        dispatch(fetchUser());
        auth.login();

        location.state?.from
          ? navigate(`${location.state.from}`)
          : navigate('/');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        reset();
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
            <Link to={'/signup'} state={location.state}>
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
