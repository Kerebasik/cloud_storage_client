import { useLocation, Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useAuth } from '../hooks/useAuth';

interface PrivateRoutes {
  children: FC;
}

export type Auth = {
  authUser: boolean;
};

const PrivateRoutes: FC<PrivateRoutes> = ({ children }): any => {
  const { auth } = useAuth();
  const location = useLocation();
  if (!auth) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />;
  }
  return children;
};

export { PrivateRoutes };
