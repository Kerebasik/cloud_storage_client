import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout';
import LogInPage from 'src/pages/LogInPage/LogInPage';
import SignUpPage from 'src/pages/SignUpPage/SignUpPage';
import HomePage from 'src/pages/HomePage/HomePage';
import AboutPage from 'src/pages/AboutPage/AboutPage';
import ErrorPage from 'src/pages/ErroePage/ErrorPage';
import { AuthProvider } from 'src/hoc/AuthProvider';
import SubscriptionsPage from '../pages/SubscriptionsPage/SubscriptionsPage';

const PublicRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Route>

        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default PublicRoutes;
