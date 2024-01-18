import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { AppLayout } from "../components/AppLayout";
import { apolloClient } from "../lib/apolloClient";

import "@/css/index.scss";



const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <ApolloProvider client={apolloClient}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </div>
  );
}
