import styled from "@emotion/styled";
import useModal from "@hooks/useModal";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  max-height: 600px;
  min-width: 300px;
  min-height: 100px;
  background-color: #ffffff;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
`;

const Modal = () => {
  const { modalContents, closeModal } = useModal();

  return modalContents.isOpen ? (
    <ModalBackground onClick={closeModal}>
      <Container>{modalContents.content}</Container>
    </ModalBackground>
  ) : null;
};

export default Modal;
