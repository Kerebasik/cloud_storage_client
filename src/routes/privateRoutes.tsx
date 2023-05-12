import { useLocation, Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useAuth } from 'src/hooks/useAuth';

interface PrivateRoutes {
  children: FC;
}

const PrivateRoutes: FC<any> = ({ children }): any => {
  const { auth } = useAuth();

  const location = useLocation();
  if (!auth) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />;
  }
  return children;
};

export { PrivateRoutes };
