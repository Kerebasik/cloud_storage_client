import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout';
import LogInPage from 'src/pages/LogInPage';
import SignUpPage from 'src/pages/SignUpPage';
import HomePage from 'src/pages/HomePage';
import AboutPage from 'src/pages/AboutPage';
import ErrorPage from 'src/pages/ErrorPage';
import { AuthProvider } from 'src/hoc/AuthProvider';
import SubscriptionsPage from '../pages/SubscriptionsPage';
import { PrivateRoutes } from './privateRoutes';
import UserPage from '../pages/UserPage';
import StoragePage from '../pages/StoragePage';
import CreateStoragePage from '../pages/CreateStoragePage';
import UploadStoragePage from '../pages/UploadStoragePage';
import StorageOutletPage from "../pages/StorageOutletPage";
import ActivateAccountPage from "../pages/ActivateAccountPage";

const AppRoutes = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route
              path="/user"
              element={
                <PrivateRoutes>
                  <UserPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/user/storage"
              element={
                <PrivateRoutes>
                  <StoragePage />
                </PrivateRoutes>
              }>
              <Route
                path=":storageId"
                element={
                  <PrivateRoutes>
                    <StorageOutletPage />
                  </PrivateRoutes>
                }
              />
              <Route
                path="create"
                element={
                  <PrivateRoutes>
                    <CreateStoragePage />
                  </PrivateRoutes>
                }
              />
              <Route
                path="upload"
                element={
                  <PrivateRoutes>
                    <UploadStoragePage />
                  </PrivateRoutes>
                }
              />
            </Route>
          </Route>

          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/activated/*" element={<ActivateAccountPage/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default AppRoutes;
