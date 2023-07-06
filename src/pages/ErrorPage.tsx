import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
const Error = React.lazy(() => import('src/components/Error/Error'));

const ErrorPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Error />
      </Suspense>
    </>
  );
};

export default ErrorPage;
