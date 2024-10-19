// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./providers/GlobalProvider";
import { Toaster } from "react-hot-toast";

// Initialize TanStack Query's QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes
      staleTime: 1000 * 60 * 5, // 5 minutes

      // Cached data remains in memory for 30 minutes after being unused
      cacheTime: 1000 * 60 * 30, // 30 minutes

      // Retry failed requests up to 3 times with exponential backoff
      retry: 3,

      // Use exponential delay between retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Keep previous data while fetching new data
      keepPreviousData: true,

      // Refetch on window focus
      refetchOnWindowFocus: true,

      // Refetch on mount if data is stale
      refetchOnMount: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <App />
          <Toaster></Toaster>
        </GlobalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
