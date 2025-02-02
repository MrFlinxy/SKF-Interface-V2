import "@/styles/globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/context/ToasterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <ToasterProvider>
              <AppShell>
                <Component {...pageProps} />
              </AppShell>
            </ToasterProvider>
          </NextThemesProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
