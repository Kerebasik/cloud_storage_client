import axiosApiInstance from '../../http/axios';
import { IUser } from '../../models/IUser';

export const getSubscriptionForUser = (user?: IUser) => {
  return axiosApiInstance.get(
    `/subscriptions/find?search=${user?.subscription}`,
  );
};
