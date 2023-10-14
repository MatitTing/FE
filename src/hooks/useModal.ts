import { useRecoilState } from "recoil";
import { modalState } from "../recoil-states/modalState";
import { useCallback } from "react";

type OpenModalType = {
  content: JSX.Element | string;
  callback?: () => any;
};

const useModal = () => {
  const [modalContents, setModalContents] = useRecoilState(modalState);

  const closeModal = useCallback(() => {
    setModalContents((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalContents]);

  const openModal = useCallback(
    ({ content, callback }: OpenModalType) => {
      setModalContents({
        isOpen: true,
        content: content,
        callBack: callback,
      });
    },
    [setModalContents]
  );

  return { modalContents, closeModal, openModal };
};

export default useModal;
