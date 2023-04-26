import React, { FC } from 'react';

import 'src/pages/SignUpPage/SignUp.style.scss';

const SignUp: FC = () => {
  const handlerOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <div className="signup_content">
          <form onSubmit={handlerOnSubmit}>
            <label className="form_title">Registration</label>
            <div className="input_email">
              <label>Enter your email</label>
              <input className="input" type="email" placeholder="email" />
            </div>
            <div className="input_password">
              <label>Enter password</label>
              <input type="password" className="input" placeholder="password" />
            </div>

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
