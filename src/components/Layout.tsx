import React, { FC, useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Content/Content';
import { userSlice } from '../store/reducers/userSlice';
import { useAppDispatch } from '../hooks/redux';
import axiosApiInstance from '../http/axios';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

const Layout: FC = () => {
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  useEffect(() => {
    axiosApiInstance
      .post(
        '/auth/',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response: AxiosResponse<IUser>) => {
        return dispatch(setUser(response.data));
      })
  });

  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

export default Layout;
