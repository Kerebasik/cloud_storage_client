import axiosApiInstance from '../../http/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISubscription } from '../../models/ISubscription';
import { UserHttpService } from "../../services/userHttpService";

export const fetchUser = createAsyncThunk('user/fetch', async (_, thunkAPI) => {
  try {
    const response = await UserHttpService.getUser();
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
