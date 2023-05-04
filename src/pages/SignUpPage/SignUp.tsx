import React, { FC, useState } from 'react';
import 'src/pages/SignUpPage/SignUp.style.scss';
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
      <div className="container">
        <div className="signup_content">
          <form onSubmit={handlerOnSubmit}>
            <label className="form_title">Registration</label>
            <div className="input_email">
              <label>Enter your email</label>
              <input className="input" type="email" placeholder="email" onChange={handlerOnChangeEmail} />
            </div>
            <div className="input_password">
              <label>Enter password</label>
              <input type="password" className="input" onChange={handlerOnChangePassword} placeholder="password" />
            </div>

            <button type="submit" onSubmit={handlerOnSubmit}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
