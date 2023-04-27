import { AppDispatch } from '../store';
import axiosApiInstance from '../../http/axios';
import { IUser } from '../../models/IUser';

export const loginUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axiosApiInstance.get<IUser>('');
  } catch (e) {}
};
