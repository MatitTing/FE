import Modal from "@component/common/Modal";
import "styles/globals.css";
import type { AppProps } from "next/app";
import ModalProvider from "src/contexts/ModalProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Modal />
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
