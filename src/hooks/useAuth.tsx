import { useContext } from 'react';
import { AuthContext, TAuthContext } from '../hoc/AuthProvider';

export function useAuth(): TAuthContext {
  return useContext<TAuthContext>(AuthContext);
}
