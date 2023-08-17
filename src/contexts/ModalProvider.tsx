import useGlobalModal from "@hook/useGlobalModal";
import React, {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  createContext,
} from "react";

export interface ModalInfoType {
  leftBtnName?: string;
  rightBtnName: string;
  contents: string;
  handleClickLeftBtn?: MouseEventHandler<HTMLButtonElement>;
  handleClickRightBtn: MouseEventHandler<HTMLButtonElement>;
  handleClickModalBackground: MouseEventHandler<HTMLDivElement>;
}

export interface ModalDispatchType {
  modalType: "none" | "Confirm" | "Delete" | "Exit";
  contents?: string | ReactNode;
  handleClickRightBtn?: MouseEventHandler<HTMLButtonElement>;
}

export const ModalStateContext = createContext<ModalInfoType | null>(null);
export const ModalDispatchContext =
  createContext<Dispatch<ModalDispatchType> | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { modalInfo, setModalInfo } = useGlobalModal();

  return (
    <ModalDispatchContext.Provider value={setModalInfo}>
      <ModalStateContext.Provider value={modalInfo}>
        {children}
      </ModalStateContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

export default ModalProvider;
