import styled from "@emotion/styled";
import useGlobalModal from "@hook/useGlobalModal";

// export const shouldNotForwardProp = (...args: string[]) => ({
//   shouldForwardProp: (propName: string) => !args.includes(propName),
// });

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

const Title = styled.h4({});

const Description = styled.p({});

const ButtonWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
});

const RigthButton = styled.button({});
const LeftButton = styled.button({});

const Modal = () => {
  const { modalInformation, setModalInformation } = useGlobalModal();

  const {
    isModalOpen,
    handleClickModalBackground,
    title,
    message,
    leftBtnName,
    rightBtnName,
    handleClickLeftBtn,
    handleClickRightBtn,
  } = modalInformation;

  return (
    isModalOpen && (
      <ModalBackground onClick={handleClickModalBackground}>
        <Container>
          <TextWrapper>
            {title && <Title>{title}</Title>}
            <Description>{message}</Description>
          </TextWrapper>
          <ButtonWrapper>
            {leftBtnName && (
              <LeftButton onClick={handleClickLeftBtn}>
                {leftBtnName}
              </LeftButton>
            )}
            <RigthButton onClick={handleClickRightBtn}>
              {rightBtnName}
            </RigthButton>
          </ButtonWrapper>
        </Container>
      </ModalBackground>
    )
  );
};

export default Modal;
