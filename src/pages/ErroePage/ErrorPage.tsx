import React, { FC } from 'react';
import './ErrorPage.style.scss';

interface ErrorPageProps {
  code?: number;
  description?: string;
}

const ErrorPage: FC<ErrorPageProps> = ({
  code = 404,
  description = 'Not found',
}: ErrorPageProps) => {
  return (
    <>
      <div className="error_page__content">
        <h1>{code}</h1>
        <p>{description}</p>
      </div>
    </>
  );
};

export default ErrorPage;
