import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { FC, PropsWithChildren } from 'react';

export const PrivateRoutes: FC<PropsWithChildren> = ({ children }) => {
  const { auth } = useAuth();

  if (auth) {
    return <>{children}</>;
  }

  return <Navigate to={'/login'} />;
};
