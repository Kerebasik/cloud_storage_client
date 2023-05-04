import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
const SignUp = React.lazy(() => import('src/components/SignUp/SignUp'));

const SignUpPage: FC = () => {
  return (
    <>
      <head>
        <title>SignUp - {process.env.REACT_APP_NAME}</title>
      </head>
      <Suspense fallback={<Preloader />}>
        <SignUp />
      </Suspense>
    </>
  );
};

export default SignUpPage;
