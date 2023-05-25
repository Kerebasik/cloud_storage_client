import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';

import LogIn from 'src/components/LogIn/LogIn';

const LogInPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <LogIn />
      </Suspense>
    </>
  );
};

export default LogInPage;
