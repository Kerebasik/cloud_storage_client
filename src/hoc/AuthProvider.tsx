import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(false);

  const signin = (newUser: any, cb: any) => {
    setAuth(true);
    cb();
  };

  const signout = (cb: any) => {
    setAuth(false);
    cb();
  };

  const value = { auth, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
