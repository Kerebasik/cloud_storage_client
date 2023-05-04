import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'src/components/Layout';
import ErrorPage from 'src/pages/ErroePage/ErrorPage';
import SignUp from '../pages/SignUpPage/SignUp';
import LogIn from '../pages/LogInPage/LogIn';

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index />
          <Route path="/about" />
          <Route path="/subscriptions" />
        </Route>

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
