import { useState } from "react";
import Modal from "@component/common/Modal";
import useGlobalModal from "../src/hook/useGlobalModal";
import "styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { modalInformation, setModalInformation } = useGlobalModal();

  return (
    <>
      <Modal />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
