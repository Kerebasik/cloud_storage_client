import { useLocation, Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useAuth } from 'src/hooks/useAuth';

export const PrivateRoutes: FC<any> = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth) {
    return children;
  }
  return <Navigate to={'/login'} state={{ from: location.pathname }} />;
};
