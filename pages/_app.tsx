import Layout from "@components/common/layout";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Modal from "src/components/common/Modal";

import ToastProvider from "@contexts/ToastProvider";
import "../styles/globals.css";
import { NextPageWithLayout } from "../types/layout";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    session: Session | null;
  };
};

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SessionProvider session={session}>
          <Modal />
          {getLayout(<Component {...pageProps} />)}
          <ToastProvider />
        </SessionProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
