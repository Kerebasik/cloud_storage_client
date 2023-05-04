import React, { FC, Suspense } from 'react';
import Home from 'src/components/Home/Home';
import Preloader from 'src/components/Preloader/Preloader';

const HomePage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Home />
      </Suspense>
    </>
  );
};

export default HomePage;
