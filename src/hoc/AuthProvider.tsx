import { createContext, useState } from 'react';
import {
  deleteAccessToken,
  getLocalStorageItem,
} from '../services/localStorageService';
import { LocalStorageVariable } from '../enums/localStorageVariable';

export type TAuthContextInitial = {
  auth: boolean;
  login: Function;
  logout: Function;
};

const initialContext: TAuthContextInitial = {
  auth: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<TAuthContextInitial>(initialContext);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<boolean>(
    !!getLocalStorageItem(LocalStorageVariable.accessToken),
  );

  const login = () => {
    setAuth(true);
  };

  const logout = () => {
    setAuth(false);
    deleteAccessToken();
  };

  const value: TAuthContextInitial = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
