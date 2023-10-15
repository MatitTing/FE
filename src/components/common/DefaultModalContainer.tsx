import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

interface ModalProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ModalContainer = styled.section`
  max-width: 768px;
  width: 100%;
`;

export const DefaultModalContainer = ({ children, style }: ModalProps) => {
  return (
    <ModalBackground>
      <ModalContainer style={style}>{children}</ModalContainer>
    </ModalBackground>
  );
};
