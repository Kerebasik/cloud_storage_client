import React, { FC } from 'react';
import { ISubscription } from 'src/models/ISubscription';
import SubscriptionCard from 'src/components/pages/SubscriptionCard/SubscriptionCard';
import './Subscriptions.style.scss';
import { useAppSelector } from '../../../hooks/redux';
import Preloader from '../../Preloader/Preloader';
import { toast } from 'react-toastify';

const Subscriptions: FC = () => {
  const { errors, isLoading, subscriptions } = useAppSelector(
    (state) => state.subscriptionReducer,
  );

  return (
    <div className={'subscriptions__content'}>
      <h1 className={'subscriptions__title title'}>
        Which subscription suits you?
      </h1>
      <p className={'subscriptions__subtitle text'}>
        You can read the subscriptions and choose the one that is right for you
      </p>

      {isLoading === true ? (
        <Preloader />
      ) : (
        <div className={'subscriptions__cards'}>
          {subscriptions?.map((item: ISubscription) => {
            return <SubscriptionCard key={item._id} item={item} />;
          })}
        </div>
      )}

      {errors && toast.error(`${errors}`)}
    </div>
  );
};

export default Subscriptions;
