import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'src/components/Layout';
import ErrorPage from 'src/pages/ErroePage/ErrorPage';
import SignUp from '../pages/SignUpPage/SignUp';

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index />
          <Route path="/about" />
        </Route>

        <Route path="/login" />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
