import { MouseEvent, useReducer } from "react";
import { ModalDispatchType } from "src/contexts/ModalProvider";

const reducer = (state: any, action: ModalDispatchType) => {
  switch (action?.modalType) {
    case "none":
      return null;
    case "Confirm":
      return {
        ...state,
        title: "타이틀 입니다.",
        rightBtnName: "확인",
        contents: action?.contents || "확인 모달입니다.",
        handleClickRightBtn: (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          if (action?.handleClickRightBtn) {
            action.handleClickRightBtn(e);
          }
        },
      };
    case "Delete":
      return {
        ...state,
        leftBtnName: "취소",
        rightBtnName: "삭제",
        contents: action?.contents || "삭제 모달입니다.",
        handleClickRightBtn: (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          if (action?.handleClickRightBtn) {
            action.handleClickRightBtn(e);
          }
        },
      };
    case "Exit":
      return {
        ...state,
        leftBtnName: "취소",
        rightBtnName: "나가기",
        contents: action?.contents || "나가기 모달입니다.",
        handleClickRightBtn: (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          if (action?.handleClickRightBtn) {
            action.handleClickRightBtn(e);
          }
        },
      };
    default:
  }
};

const useGlobalModal = () => {
  const [modalInfo, setModalInfo] = useReducer(reducer, null);

  return { modalInfo, setModalInfo };
};

export default useGlobalModal;
