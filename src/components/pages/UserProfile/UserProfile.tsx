import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ProgressBar from '@ramonak/react-progress-bar';
import './UserProfile.style.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useAuth } from 'src/hooks/useAuth';
import { userSlice } from 'src/store/reducers/userSlice';
import { ISubscription } from 'src/models/ISubscription';
import { convertByteToGigaByteString } from '../SubscriptionCard/SubscriptionCard';
import { IUser } from 'src/models/IUser';
import defaultimage from 'src/assets/userIcon.png';
import { toast } from "react-toastify";
import { UserHttpService } from "../../../services/userHttpService";
import { AuthHttpService } from "../../../services/authHttpService";

export const convertUsedSpace = (
  usedStorage: number,
  diskStorage: number,
): number => {
  return (usedStorage / diskStorage) * 100;
};

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState(defaultimage);
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
    AuthHttpService.logout().then(() => {
      logout();
      dispatch(deleteUser());
      navigate('/');
    });
  };

  const avatarOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList!.length > 0) {
      UserHttpService.setUserAvatar(fileList![0])
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setUser(user);
          toast.error(error.response.data.message);
        });
    }
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

  useEffect(() => {
    const getImage = async () => {
      if(!!user?.avatar){
        const image = await UserHttpService.getUserAvatar(user!.avatar);
        setAvatar(image)
      }
    };
    getImage();
  }, [user]);

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
                <img src={avatar} alt={'avatar'} />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={avatarOnChangeHandler}
              />
            </div>
            <div className={'profile__description__data'}>
              <p>Id: {user?._id}</p>
              <p>Email: {user?.email}</p>
              <p>Subscription: {subscription?.name}</p>
              <p>Max storage: {convertByteToGigaByteString(subscription?.diskStorage!)} GB</p>
            </div>
          </div>
          <div className={'profile__storage'}>
            <div className={'profile__storage__data'}>
              <div className={'profile__storage__data__title'}>
                <p>
                  Storage: {convertByteToGigaByteString(user?.usedStorage!).toFixed(2)} out
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
