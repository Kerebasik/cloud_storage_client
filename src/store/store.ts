import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from 'src/store/reducers/userSlice';
import subscriptionReducer from 'src/store/reducers/subscriptionsSlice';

const rootReducer = combineReducers({
  userReducer,
  subscriptionReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
