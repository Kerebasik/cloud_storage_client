import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
import User from 'src/components/User/User';

const UserPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <User />
      </Suspense>
    </>
  );
};

export default UserPage;
