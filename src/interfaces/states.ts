import { Location } from 'react-router-dom';
import { ISubscription } from '../models/ISubscription';
import { IUser } from '../models/IUser';

export interface LocationState extends Location {
  state: {
    id: string;
    name: string;
    from: string;
    type: string;
  };
}

export interface SubscriptionsState {
  subscriptions: ISubscription[] | undefined;
  isLoading: boolean;
  errors: string;
}

export interface UserState {
  user: IUser | undefined;
  isLoading: boolean;
  error: string;
}
