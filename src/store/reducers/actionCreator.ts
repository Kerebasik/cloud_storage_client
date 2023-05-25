import axiosApiInstance from '../../http/axios';
import { IUser } from '../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISubscription } from '../../models/ISubscription';

export const fetchUser = createAsyncThunk('user/fetch', async (_, thunkAPI) => {
  try {
    const response = await axiosApiInstance.post<IUser>('/auth');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axiosApiInstance.get<ISubscription[]>(
        '/subscriptions/find',
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
