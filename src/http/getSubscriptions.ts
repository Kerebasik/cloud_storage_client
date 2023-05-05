import axiosApiInstance from './axios';
import { AxiosResponse } from 'axios';
import { ISubscription } from '../models/ISubscription';

export function getSubscriptions() {
  return axiosApiInstance
    .get('/subscriptions/findAll', { withCredentials: true })
    .then((result: AxiosResponse<ISubscription[]>) => {
      return result.data;
    });
}
