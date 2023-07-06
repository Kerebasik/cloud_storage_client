import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
import BackButton from '../components/BackButton/BackButton';

const SignUp = React.lazy(() => import('src/components/pages/SignUp/SignUp'));

const SignUpPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <BackButton>
          <SignUp />
        </BackButton>
      </Suspense>
    </>
  );
};

export default SignUpPage;
