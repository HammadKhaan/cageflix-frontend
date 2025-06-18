import { QueryClient } from "@tanstack/react-query";

const TEN_MINUTES = 1000 * 60 * 10;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TEN_MINUTES,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1
    },
  },
});