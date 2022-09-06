import { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);
