import axiosApiInstance from "../http/axios";
import {AxiosResponse} from "axios";
import { ISubscription } from "../models/ISubscription";

class SubscriptionHttpService {
  static getSubscriptions(){
    return axiosApiInstance
      .get('/subscriptions/find')
      .then((result: AxiosResponse<ISubscription[]>) => {
        return result.data;
      });
  }
}

export {SubscriptionHttpService}