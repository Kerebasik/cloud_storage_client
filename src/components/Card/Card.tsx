import React, { FC } from 'react';
import { ISubscription } from 'src/models/ISubscription';
import 'src/components/Card/Card.style.scss';

interface SubscriptionCardProps {
  item: ISubscription;
}

export const convertByteToMegaByte = (diskStorageToByte: number): number => {
  return diskStorageToByte / 1024 ** 3;
};

export const convertCentToDollar = (priceInCent: number): string => {
  if (priceInCent === 0) {
    return 'Free';
  }
  return `${priceInCent / 100} USD`;
};

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  item,
}: SubscriptionCardProps) => {
  return (
    <>
      <div className={'card'}>
        <h2 className={'card__title'}>{item.name}</h2>
        <p className={'card__storage'}>
          Storage: {convertByteToMegaByte(item.diskStorage)} Gb
        </p>
        <p className={'card__price'}>
          {convertCentToDollar(item.priceInCents)}
        </p>
        <button className={'card__button'} disabled={item.name === 'Standart'}>
          Subscribe
        </button>
      </div>
    </>
  );
};

export default SubscriptionCard;
