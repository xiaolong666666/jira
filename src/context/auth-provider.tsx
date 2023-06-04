// @ts-nocheck
import { createContext, useContext, ReactNode } from "react";
import {
  loginParams,
  getToken,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
} from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { useMount, useRequest } from "utils/hooks";
import { http } from "utils/http";
import { FullLoading, FullPageErrorCallback } from "components/lib";

const getInitialUser = async () => {
  let user = null;
  const token = getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = createContext<
  | {
      user: User | null;
      register: (params: loginParams) => Promise<void>;
      login: (params: loginParams) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    error,
    isInit,
    isLoading,
    isError,
    setState: setUser,
  } = useRequest<User | null>();
  const register = (params: loginParams) => authRegister(params).then(setUser);
  const login = (params: loginParams) => authLogin(params).then(setUser);
  const logout = () => authLogout().then(() => setUser(null));

  useMount(() => {
    run(getInitialUser());
  });

  if (isInit || isLoading) {
    return <FullLoading />;
  }

  if (isError) {
    return <FullPageErrorCallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, register, login, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
