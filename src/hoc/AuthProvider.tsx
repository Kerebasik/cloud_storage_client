import { createContext, useState } from 'react';

export type TAuthContextInitial = {
  auth: boolean;
};

export type TAuthContext = TAuthContextInitial & {
  login?: Function;
  logout?: Function;
};

export const AuthContext = createContext<TAuthContext>({ auth: false });

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<boolean>(false);

  const login = (cb: Function) => {
    setAuth(true);
    cb();
  };

  const logout = (cb: Function) => {
    setAuth(false);
    cb();
  };

  const value: TAuthContext = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
