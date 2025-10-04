import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type TanstackProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

function TanstackProvider({ children }: TanstackProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default TanstackProvider;
