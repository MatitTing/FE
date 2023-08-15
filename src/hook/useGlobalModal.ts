import {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  MouseEventHandler,
  createContext,
} from "react";

export type ModalInformationType = {
  leftBtnName?: string;
  rightBtnName: string;
  title?: string;
  message: string;
  handleClickLeftBtn?: MouseEventHandler<HTMLButtonElement>;
  handleClickRightBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickModalBackground: MouseEventHandler<HTMLDivElement>;
};

export type ModalStateContextType = {
  modaltype: "Confirm" | "Delete" | "Exit";
  handleClickRightBtn: MouseEventHandler<HTMLButtonElement>;
};

const useGlobalModal = () => {
  // 전역 상태 라이브러리 도입
  const [modalInformation, setModalInformation] =
    useState<ModalStateContextType | null>(null);
  const [modalContents, setMOdalContents] = useState(null);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (modalInformation) {
  //     const { modaltype, handleClickRightBtn } = modalInformation;

  //     switch (modaltype) {
  //       case "Confirm":
  //         console.log("확인 입니다.");
  //         break;
  //       case "Delete":
  //         console.log();
  //         break;
  //       case "Exit":
  //         console.log();
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // }, [modalInformation, setModalInformation]);

  // const handleClickBtnInModal = useCallback(
  //   (func?: () => void) =>
  //     (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
  //       e.stopPropagation();
  //       func && func();
  //       setModalInformation(null);
  //     },
  //   []
  // );

  // useEffect(() => {
  //   if (modalInformation) {
  //     setModalInformation({
  //       leftBtnName: "취소",
  //       rightBtnName: "확인",
  //       message: "모달입니다.",
  //       handleClickLeftBtn: handleClickBtnInModal(() => {
  //         console.log("handleClickLeftBtn");
  //       }),
  //       handleClickRightBtn: handleClickBtnInModal(() => {
  //         console.log("handleClickRightBtn");
  //       }),
  //       handleClickModalBackground: handleClickBtnInModal(() => {
  //         console.log("handleClickDimmed");
  //       }),
  //     });
  //   }
  // }, [handleClickBtnInModal, modalInformation]);

  return { modalContents, modalInformation, setModalInformation };
};

export default useGlobalModal;
