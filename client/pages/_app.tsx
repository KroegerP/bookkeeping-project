import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { AppLayout } from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/css/index.scss";
import { Toaster } from "@/components/ui/toaster";
import { apolloClient } from "@/lib/apolloClient";



const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloProvider client={apolloClient}>
        <AppLayout className={inter.className}>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
      <Toaster />
    </ThemeProvider>
  );
}
