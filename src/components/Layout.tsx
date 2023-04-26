import React, { FC } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Content/Content';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

export default Layout;
