import React, { FC, useEffect } from 'react';
import './App.style.scss';
import AppRoutes from './routes/appRoutes';
import { useAppDispatch } from './hooks/redux';
import { fetchSubscriptions, fetchUser } from './store/reducers/actionCreator';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchSubscriptions());
  });

  return <AppRoutes />;
};

export default App;
