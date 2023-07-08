import { ISubscription } from '../../models/ISubscription';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSubscriptions } from './actionCreator';
import { SubscriptionsState } from '../../interfaces/states';

const initialState: SubscriptionsState = {
  subscriptions: undefined,
  isLoading: false,
  errors: '',
};

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSubscriptions.fulfilled.type]: (
      state,
      action: PayloadAction<ISubscription[]>,
    ) => {
      state.subscriptions = action.payload;
      state.errors = '';
      state.isLoading = false;
    },
    [fetchSubscriptions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSubscriptions.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export default subscriptionsSlice.reducer;
