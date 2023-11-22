"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function ReactQuery({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
