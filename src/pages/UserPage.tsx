import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
const UserProfile = React.lazy(
  () => import('src/components/pages/UserProfile/UserProfile'),
);

const UserPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <UserProfile />
      </Suspense>
    </>
  );
};

export default UserPage;
