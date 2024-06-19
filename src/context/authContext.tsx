/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface IAuthContext {}

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    <AuthContext.Provider value={{}}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
};
