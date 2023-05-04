import React, { FC, Suspense } from 'react';
import Preloader from 'src/components/Preloader/Preloader';
const Subscriptions = React.lazy(
  () => import('src/components/Subcriptions/Subscriptions'),
);

const SubscriptionsPage: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Subscriptions />
      </Suspense>
    </>
  );
};

export default SubscriptionsPage;
