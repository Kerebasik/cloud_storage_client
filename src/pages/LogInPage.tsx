import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';

import LogIn from 'src/components/pages/LogIn/LogIn';
import BackButton from '../components/BackButton/BackButton';

const LogInPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <BackButton>
          <LogIn />
        </BackButton>
      </Suspense>
    </>
  );
};

export default LogInPage;
