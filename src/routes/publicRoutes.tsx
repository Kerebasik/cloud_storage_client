import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout';
import ErrorPage from 'src/pages/ErroePage/ErrorPage';
import LogInPage from 'src/pages/LogInPage/LogInPage';
import SignUpPage from 'src/pages/SignUpPage/SignUpPage';

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index />
          <Route path="/about" />
          <Route path="/subscriptions" />
        </Route>

        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
