import React, { FC } from 'react';
import { ISubscription } from 'src/models/ISubscription';
import './Card.style.scss';
import { useAppSelector } from 'src/hooks/redux';
import { IUser } from 'src/models/IUser';
interface CardProps {
  item: ISubscription;
}

export const convertByteToMegaByteString = (diskStorageToByte: number) => {
  return `Storage: ${diskStorageToByte / 1024 ** 3} Gb`;
};

export const convertCentToDollarString = (priceInCent: number) => {
  if (priceInCent === 0) {
    return 'Free';
  }
  return `${priceInCent / 100} USD in a month`;
};

const handlerOnClickButton = () => {
  console.log('click');
};

const Card: FC<CardProps> = ({ item }) => {
  const user: IUser | undefined = useAppSelector(
    (state) => state.userReducer.user,
  );
  return (
    <div className={'card__container'}>
      <div className={'card__content'}>
        <div className={'card__title'}>
          <h2>{item.name}</h2>
        </div>
        <div className={'card__price'}>
          <p>{convertCentToDollarString(item.priceInCents)}</p>
        </div>
        <div className={'card__storage'}>
          <p>{convertByteToMegaByteString(item.diskStorage)}</p>
        </div>
        <div className={`card__button`}>
          <button
            className={`${item._id === user?.subscription ? 'disable' : ''}`}
            onClick={handlerOnClickButton}
            disabled={item._id === user?.subscription}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
