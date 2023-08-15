import useGlobalModal from "@hook/useGlobalModal";
import React, {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  createContext,
  useReducer,
} from "react";

export type ModalStateContextType = {
  modalType: "Confirm" | "Delete" | "Exit";
  rightBtnName: string;
  message: string;
  handleClickRightBtn?: () => void;
};

type Confirm = {
  type: "Confirm";
  rightBtnName: "확인";
  message: string;
  handleClickRightBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickModalBackground: MouseEventHandler<HTMLDivElement>;
};

type Delete = {
  type: "Delete";
  leftBtnName: "취소";
  rightBtnName: "삭제";
  message: "삭제하기";
  handleClickLeftBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickRightBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickModalBackground: MouseEventHandler<HTMLDivElement>;
};

type Exit = {
  type: "Exit";
  leftBtnName: "취소";
  rightBtnName: "나가기";
  message: "나가기";
  handleClickLeftBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickRightBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickModalBackground: MouseEventHandler<HTMLDivElement>;
};

type ModalType = Confirm | Delete | Exit;

interface ModalDispatchType {
  modalType: "Confirm" | "Delete" | "Exit";
  handleClickRightBtn?: MouseEventHandler<HTMLButtonElement>;
}

export const ModalStateContext = createContext<ModalType | null>(null);
export const ModalDispatchContext =
  createContext<Dispatch<ModalDispatchType> | null>(null);

const reducer = (state: any, action: ModalDispatchType) => {
  switch (action.modalType) {
    case "Confirm":
      return {
        ...state,
        rightBtnName: "확인",
        message: "확인 모달입니다.",
        handleClickRightBtn: (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          if (action?.handleClickRightBtn) {
            action.handleClickRightBtn(e);
          }
        },
      };
    case "Delete":
      return {
        ...state,
        rightBtnName: "삭제",
        message: "삭제 모달입니다.",
        handleClickRightBtn: (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          if (action?.handleClickRightBtn) {
            action.handleClickRightBtn(e);
          }
        },
      };
    case "Exit":
      return {
        ...state,
        rightBtnName: "나가기",
        message: "나가기 모달입니다.",
        handleClickRightBtn: (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          if (action?.handleClickRightBtn) {
            action.handleClickRightBtn(e);
          }
        },
      };
    default:
      return null;
  }
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, null);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
