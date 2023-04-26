import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './Content.style.scss';

const Content: FC = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};

export default Content;
