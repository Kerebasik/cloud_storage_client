import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';

const SignUp = React.lazy(() => import('src/components/SignUp/SignUp'));

const SignUpPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <SignUp />
      </Suspense>
    </>
  );
};

export default SignUpPage;
