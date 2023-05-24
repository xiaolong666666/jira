import { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { QueryClientProvider, QueryClient } from "react-query";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);
