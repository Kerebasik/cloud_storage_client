import React, { FC } from 'react';
import { ISubscription } from 'src/models/ISubscription';

interface SubscriptionCardProps {
  item: ISubscription;
}

export const convertByteToMegaByte = (diskStorageToByte: number) => {
  return diskStorageToByte / 1024 ** 3;
};

export const convertCentToDollar = (priceInCent: number) => {
  return priceInCent / 100;
};

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  item,
}: SubscriptionCardProps) => {
  return (
    <>
      <h2>{item.name}</h2>
      <p>{convertByteToMegaByte(item.diskStorage)}</p>
      <p>{convertCentToDollar(item.priceInCents)}</p>
    </>
  );
};

export default SubscriptionCard;
