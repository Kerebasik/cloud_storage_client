import React, { Suspense } from 'react';
import Preloader from '../components/Preloader/Preloader';
import BackButton from '../components/BackButton/BackButton';
const UploadStorage = React.lazy(
  () => import('src/components/pages/UploadStorage/UploadStorage'),
);

const UploadStoragePage = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <BackButton>
          <UploadStorage />
        </BackButton>
      </Suspense>
    </>
  );
};

export default UploadStoragePage;
