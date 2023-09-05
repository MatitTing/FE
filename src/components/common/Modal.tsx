import styled from "@emotion/styled";
import { useContext } from "react";
import {
  ModalDispatchContext,
  ModalStateContext,
} from "@contexts/ModalProvider";

const ModalBackground = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgb(0,0,0,0.4)",
  zIndex: 999999,
});

const Container = styled.div({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px",
  width: "fit-content",
  height: "fit-content",
  minWidth: "220px",
  minHeight: "120px",
  backgroundColor: "#fff",
  borderRadius: "10px",
});

const TextWrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  gap: "10px",

  "& > *": {
    margin: 0,
  },
});

const Description = styled.p({});

const ButtonWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
});

const RigthButton = styled.button({});
const LeftButton = styled.button({});

const Modal = () => {
  const dispatch = useContext(ModalDispatchContext);
  const modalInfo = useContext(ModalStateContext);

  if (!modalInfo) return;

  const handleModalCancel = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch && dispatch({ modalType: "none" });
  };

  return (
    modalInfo && (
      <ModalBackground onClick={handleModalCancel}>
        <Container>
          <TextWrapper>
            <Description>{modalInfo?.contents}</Description>
          </TextWrapper>
          <ButtonWrapper>
            {modalInfo?.leftBtnName && (
              <LeftButton onClick={handleModalCancel}>
                {modalInfo?.leftBtnName}
              </LeftButton>
            )}
            <RigthButton onClick={handleModalCancel}>
              {modalInfo?.rightBtnName}
            </RigthButton>
          </ButtonWrapper>
        </Container>
      </ModalBackground>
    )
  );
};

export default Modal;
