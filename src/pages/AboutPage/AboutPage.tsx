import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
const About = React.lazy(() => import('src/components/About/About'));

const AboutPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <About />
      </Suspense>
    </>
  );
};

export default AboutPage;
