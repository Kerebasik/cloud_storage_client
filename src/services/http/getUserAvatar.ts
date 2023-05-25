import { IUser } from '../../models/IUser';
import image from '../../assets/userIcon.png';

export function getUserAvatar(user: IUser) {
  return user?.avatar
    ? `${process.env.REACT_APP_API_URL}/${user?.avatar}`
    : image;
}
