import { IUser } from 'src/models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from './actionCreator';

interface UserState {
  user: IUser | undefined;
  isLoading: boolean;
  errors: string;
}

const initialState: UserState = {
  user: undefined,
  isLoading: false,
  errors: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser(state) {
      state.user = initialState.user;
      state.errors = initialState.errors;
      state.isLoading = initialState.isLoading;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.errors = '';
      state.user = action.payload;
      state.isLoading = false;
    },
    [fetchUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export default userSlice.reducer;
