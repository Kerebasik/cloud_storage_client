import React, { FC, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import { userSlice } from 'src/store/reducers/userSlice';
import { useAppDispatch } from 'src/hooks/redux';
import axiosApiInstance from 'src/http/axios';
import { AxiosResponse } from 'axios';
import { IUser } from 'src/models/IUser';
import './Layout.style.scss';

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
      });
  });

  return (
    <>
      <head>
        <title>BitHolder</title>
      </head>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

export default Layout;
