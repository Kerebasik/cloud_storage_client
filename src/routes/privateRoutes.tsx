import { useLocation, Navigate } from 'react-router-dom';
import { FC } from 'react';

interface PrivateRoutes {
  children: FC;
}

const PrivateRoutes: FC<PrivateRoutes> = ({ children }): any => {
  const auth = false;
  const location = useLocation();
  if (!auth) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />;
  }
  return children;
};

export { PrivateRoutes };
