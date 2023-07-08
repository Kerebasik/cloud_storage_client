import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';

const Storage = React.lazy(
  () => import('src/components/pages/Storage/Storage'),
);

const StoragePage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Storage />
      </Suspense>
    </>
  );
};

export default StoragePage;
