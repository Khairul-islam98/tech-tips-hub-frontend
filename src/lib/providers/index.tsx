"use client";

import UserProvider from "@/context/user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner"

export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        {children}
        </UserProvider>
    </QueryClientProvider>
  );
}
