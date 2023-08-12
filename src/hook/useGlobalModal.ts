import {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  Dispatch,
} from "react";

export const ModalInformation = {
  isModalOpen: false,
  rightBtnName: "",
  message: "",
  handleClickRightBtn: () => {},
  handleClickModalBackground: () => {},
};

export type ModalInformationType = {
  isModalOpen: boolean;
  leftBtnName?: string;
  rightBtnName: string;
  title?: string;
  message: string;
  handleClickLeftBtn?: MouseEventHandler<HTMLButtonElement>;
  handleClickRightBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickModalBackground: MouseEventHandler<HTMLDivElement>;
};

// type Confirm = {
//   type: "confirm";
//   rightBtnName: "확인";
//   message: string;
//   handleClickRightBtn: () => void;
// };

// type Delete = {
//   type: "delete";
//   leftBtnName: "취소";
//   rightBtnName: "삭제";
//   message: "삭제하기";
//   handleClickLeftBtn: () => void;
//   handleClickRightBtn: () => void;
// };

// type Exit = {
//   type: "exit";
//   leftBtnName: "취소";
//   rightBtnName: "나가기";
//   message: "나가기";
//   handleClickLeftBtn: () => void;
//   handleClickRightBtn: () => void;
// };

// type ModalType = Confirm | Delete | Exit;

const useGlobalModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // 전역 상태 라이브러리 도입
  const [modalInformation, setModalInformation] =
    useState<ModalInformationType>(ModalInformation);

  const handleClickBtnInModal = useCallback(
    (func?: () => void) =>
      (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.stopPropagation();
        func && func();
        setModalInformation(ModalInformation);
        setIsModalOpen(false);
      },
    []
  );

  useEffect(() => {
    if (isModalOpen) {
      setModalInformation({
        isModalOpen: true,
        leftBtnName: "취소",
        rightBtnName: "확인",
        message: "모달입니다.",
        handleClickLeftBtn: handleClickBtnInModal(() => {
          console.log("handleClickLeftBtn");
        }),
        handleClickRightBtn: handleClickBtnInModal(() => {
          console.log("handleClickRightBtn");
        }),
        handleClickModalBackground: handleClickBtnInModal(() => {
          console.log("handleClickDimmed");
        }),
      });
    }
  }, [isModalOpen]);

  return { modalInformation, setModalInformation };
};

export default useGlobalModal;
