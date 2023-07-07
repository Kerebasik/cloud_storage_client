import React, { FC } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormSignUpInput } from 'src/interfaces/componentsProps';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'src/hooks/useAuth';
import 'src/components/pages/SignUp/SignUp.style.scss';
import { useAppDispatch } from "../../../hooks/redux";
import { fetchUser } from "../../../store/reducers/actionCreator";
import { toast } from "react-toastify";
import { AuthHttpService } from "../../../services/authHttpService";

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation()
  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm<IFormSignUpInput>();
  const email=watch('email')
  const password=watch('password')

  const handlerOnSubmit: SubmitHandler<IFormSignUpInput> = () => {
    AuthHttpService.signup({ email, password })
      .then(() => {
        dispatch(fetchUser());
        auth.login();
        navigate('/login',{state:location.state})
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      }).finally(()=>{
        reset()
    });
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
