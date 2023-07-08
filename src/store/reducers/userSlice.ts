import { IUser } from 'src/models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from './actionCreator';
import { UserState } from '../../interfaces/states';

const initialState: UserState = {
  user: undefined,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser(state) {
      state.user = initialState.user;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },

    addNewDir(state, action) {
      state.user?.files.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUser.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          state.error = '';
          state.user = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchUser.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUser.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default userSlice.reducer;
