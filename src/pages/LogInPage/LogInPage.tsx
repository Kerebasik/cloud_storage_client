import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
const LogIn = React.lazy(() => import('src/components/LogIn/LogIn'));

const LogInPage: FC = () => {
  return (
    <>
      <head>
        <title>LogIn - {process.env.REACT_APP_NAME}</title>
      </head>
      <Suspense fallback={<Preloader />}>
        <LogIn />
      </Suspense>
    </>
  );
};

export default LogInPage;
