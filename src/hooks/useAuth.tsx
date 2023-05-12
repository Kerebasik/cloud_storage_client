import { useContext } from 'react';
import { AuthContext, TAuthContextInitial } from '../hoc/AuthProvider';

export function useAuth(): TAuthContextInitial {
  return useContext<TAuthContextInitial>(AuthContext);
}
