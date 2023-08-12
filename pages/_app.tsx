import { useState } from "react";
import Modal from "@component/common/Modal";
import useGlobalModal from "../src/hook/useGlobalModal";
import "styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { modalInformation, setModalInformation } = useGlobalModal({
    isModalOpen,
    setIsModalOpen,
  });

  return (
    <>
      <Modal
        modalInformation={modalInformation}
        setModalInformation={setModalInformation}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
