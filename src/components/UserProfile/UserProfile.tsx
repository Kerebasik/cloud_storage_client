import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ProgressBar from '@ramonak/react-progress-bar';
import './UserProfile.style.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useAuth } from 'src/hooks/useAuth';
import { userSlice } from 'src/store/reducers/userSlice';
import { ISubscription } from 'src/models/ISubscription';
import { convertByteToGigaByteString } from '../SubscriptionCard/SubscriptionCard';
import { userLogOut } from 'src/services/http/userLogOut';
import { setUserAvatar } from '../../services/http/setUserAvatar';
import { IUser } from '../../models/IUser';
import { getUserAvatar } from '../../services/http/getUserAvatar';

const convertUsedSpace = (usedStorage: number, diskStorage: number): number => {
  return (usedStorage / diskStorage) * 100;
};

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const { deleteUser } = userSlice.actions;
  const [user, setUser] = useState<IUser | undefined>(
    useAppSelector((state) => state.userReducer.user),
  );
  const { subscriptions } = useAppSelector(
    (state) => state.subscriptionReducer,
  );
  const [subscription, setSubscription] = useState<ISubscription>();

  const onClickNavigateHandler = () => {
    return navigate(`/user/storage/${user?._id}`);
  };
  const onClickLogOutHandler = async () => {
    userLogOut().then(() => {
      logout();
      dispatch(deleteUser());
      navigate('/');
    });
  };

  const avatarOnChangeHandler = (list: FileList) => {
    const file = list[0];
    setUserAvatar(file).then((response) => {
      setUser(response.data);
    });
  };

  const upgradeSubscriptionForUserHandler = () => {
    navigate('/subscriptions');
  };

  useEffect(() => {
    const result = subscriptions?.find(
      (item) => item._id === user?.subscription,
    );
    setSubscription(result);
  }, [user, subscriptions]);

  return (
    <div className={'profile'}>
      <div className={'profile__container'}>
        <div className={'profile__title'}>
          <h1 className={'title'}>
            <FormattedMessage id={'user.title'} />
          </h1>
        </div>
        <div className={'profile__content text'}>
          <div className={'profile__description'}>
            <div className={'upload__avatar'}>
              <label htmlFor={'file-input'}>
                <img src={getUserAvatar(user!)} alt={'avatar'} />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e: any) => avatarOnChangeHandler(e.target.files)}
              />
            </div>
            <div className={'profile__description__data'}>
              <p>Id: {user?._id}</p>
              <p>Email: {user?.email}</p>
              <p>Subscription: {subscription?.name}</p>
              <p>Max storage: {subscription?.diskStorage}</p>
            </div>
          </div>
          <div className={'profile__storage'}>
            <div className={'profile__storage__data'}>
              <div className={'profile__storage__data__title'}>
                <p>
                  Storage: {convertByteToGigaByteString(user?.usedStorage!)} out
                  of {convertByteToGigaByteString(subscription?.diskStorage!)}{' '}
                  GB
                </p>
                <button onClick={upgradeSubscriptionForUserHandler}>
                  Upgrade
                </button>
              </div>
              <ProgressBar
                className={'progressbar__wrapper'}
                bgColor={'#FFB628'}
                baseBgColor={'#282828'}
                labelColor={'#00000'}
                completed={convertUsedSpace(
                  user?.usedStorage!,
                  subscription?.diskStorage!,
                )}
                maxCompleted={100}
              />
            </div>
            <div className={'profile__storage__logout'}>
              <button onClick={onClickNavigateHandler}>Your Storage</button>
              <button onClick={onClickLogOutHandler}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
