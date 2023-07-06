import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
import BackButton from '../components/BackButton/BackButton';
const CreateDirForStorage = React.lazy(
  () => import('src/components/pages/CreateStorage/CreateStorage'),
);

const CreateStoragePage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <BackButton>
          <CreateDirForStorage />
        </BackButton>
      </Suspense>
    </>
  );
};

export default CreateStoragePage;
