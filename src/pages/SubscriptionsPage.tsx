import React, { FC, Suspense } from 'react';
import Subscriptions from 'src/components/pages/Subscriptions/Subscriptions';
import Preloader from 'src/components/Preloader/Preloader';

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
