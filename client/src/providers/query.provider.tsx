import { MINUTE } from '@/constants/default-values';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//TODO: learn about query client default option
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      staleTime: 2 * MINUTE,
      gcTime: 15 * MINUTE,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
};
