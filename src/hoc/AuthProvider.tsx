import { createContext, useState } from 'react';

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
  const [auth, setAuth] = useState<boolean>(initialContext.auth);

  const login = (cb: Function) => {
    setAuth(true);
    cb();
  };

  const logout = (cb: Function) => {
    setAuth(false);
    cb();
  };

  const value: TAuthContextInitial = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
