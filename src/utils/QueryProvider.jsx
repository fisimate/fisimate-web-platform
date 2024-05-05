'use client'
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const InitProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default InitProvider;
