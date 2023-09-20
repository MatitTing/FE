import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface AuthButtonProps {
  bgColor?: string;
  color?: string;
  src: string;
  type?: string;
  alt?: string;
  width?: number;
  height?: number;
  provider?: string;
  onunload?: any; //수정예정
}

interface ContainerProps {
  bgColor?: string;
  color?: string;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

const AuthButton = (props: AuthButtonProps) => {
  const {
    bgColor,
    color,
    src,
    type,
    alt,
    width = "40px",
    height = "40px",
    provider,
    onunload,
  } = props;
  return (
    <Container
      color={color}
      bgColor={bgColor}
      onClick={() => {
        signIn(provider);
      }}
    >
      <Image src={src} alt={alt} width={width} height={height} />
      {alt}계정으로 {type === "signin" ? "로그인" : "회원가입"}
    </Container>
  );
};

export default AuthButton;
