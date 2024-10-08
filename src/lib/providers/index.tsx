"use client";

import { NotificationProvider } from "@/context/notification-provider";
import UserProvider from "@/context/user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <Toaster />
          {children}
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
