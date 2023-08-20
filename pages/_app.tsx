import "../styles/globals.css";
import Layout from "../src/component/layout";
import ModalProvider from "src/contexts/ModalProvider";
import Modal from "@component/common/Modal";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextPageWithLayout } from "../types/layout";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "../src/contexts/ToastProvider";
import type { AppProps } from "next/app";

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
      <SessionProvider session={session}>
        <ModalProvider>
      <Modal />
        <ToastProvider>{getLayout(<Component {...pageProps} />)}</ToastProvider>
          </ModalProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
