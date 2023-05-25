import React, { FC, useEffect, useState } from 'react';
import { getSubscriptions } from 'src/services/http/getSubscriptions';
import { ISubscription } from 'src/models/ISubscription';
import SubscriptionCard from 'src/components/SubscriptionCard/SubscriptionCard';

import './Subscriptions.style.scss';

const Subscriptions: FC = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  useEffect(() => {
    getSubscriptions().then((res) => {
      res.sort((a, b) => (a.priceInCents > b.priceInCents ? 1 : -1));
      setSubscriptions(res);
    });
  }, []);

  return (
    <div className={'subscriptions__content'}>
      <h1 className={'subscriptions__title title'}>
        Which subscription suits you?
      </h1>
      <p className={'subscriptions__subtitle text'}>
        You can read the subscriptions and choose the one that is right for you
      </p>
      <div className={'subscriptions__cards'}>
        {subscriptions.map((item: ISubscription) => {
          return <SubscriptionCard key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Subscriptions;
