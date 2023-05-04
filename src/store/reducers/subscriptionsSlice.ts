import { ISubscription } from 'src/models/ISubscription';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionsState {
  subscriptions: ISubscription[];
  isLoading: boolean;
}

const initialState: SubscriptionsState = {
  subscriptions: [],
  isLoading: false,
};

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setSubscriptions(state, action: PayloadAction<ISubscription[]>) {
      state.subscriptions = action.payload;
    },
  },
});

export default subscriptionsSlice.reducer;
