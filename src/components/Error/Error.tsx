import React, { FC } from 'react';
import './Error.style.scss';

interface ErrorProps {
  code?: number;
  description?: string;
}

const Error: FC<ErrorProps> = ({
  code = 404,
  description = 'Not found',
}: ErrorProps) => {
  return (
    <>
      <div className="error_page__content">
        <h1>{code}</h1>
        <p>{description}</p>
      </div>
    </>
  );
};

export default Error;
