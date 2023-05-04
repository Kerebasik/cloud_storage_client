import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
const Home = React.lazy(() => import('src/components/Home/Home'));

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
