import React, { FC, useEffect, useState } from 'react';
import axiosApiInstance from 'src/http/axios';
import { useAppDispatch } from 'src/hooks/redux';
import { AxiosResponse } from 'axios';
import { ISubscription } from 'src/models/ISubscription';
import { subscriptionsSlice } from 'src/store/reducers/subscriptionsSlice';
import SubscriptionCard from 'src/components/Card/Card';
import './Subscriptions.style.scss';

const Subscriptions: FC = () => {
  const { setSubscriptions } = subscriptionsSlice.actions;
  const dispatch = useAppDispatch();
  const [subscriptions, setSubscriptionsValue] = useState<ISubscription[]>([]);

  useEffect(() => {
    axiosApiInstance
      .get('/subscription/findAll', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response: AxiosResponse<ISubscription[]>) => {
        dispatch(setSubscriptions(response.data));
        const sortSubscriptions = response.data.sort((a, b) =>
          a.priceInCents > b.priceInCents ? 1 : -1,
        );
        setSubscriptionsValue(sortSubscriptions);
      });
  });

  return (
    <>
      <div className={'cards'}>
        {subscriptions.map((item: ISubscription) => {
          return <SubscriptionCard key={item._id} item={item} />;
        })}
      </div>
    </>
  );
};

export default Subscriptions;
