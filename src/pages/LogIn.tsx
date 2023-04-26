import React, { FC } from 'react';

interface LoginProps {}

const LogIn: FC<LoginProps> = ({}: LoginProps) => {
  return (
    <>
      <div>
        <h1>{}</h1>
        <p>{}</p>
      </div>
    </>
  );
};

export default LogIn;
