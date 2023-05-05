import React, { FC, useEffect, useState } from 'react';
import { getSubscriptions } from 'src/http/getSubscriptions';
import { ISubscription } from 'src/models/ISubscription';
import Card from 'src/components/Card/Card';

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
      <div className={'subscriptions__cards'}>
        {subscriptions.map((item: ISubscription) => {
          return <Card key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Subscriptions;
