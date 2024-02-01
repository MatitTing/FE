import React, { MouseEventHandler, forwardRef } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

interface AuthButtonProps {
  bgColor?: string;
  color?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
    alt,
    width = "40",
    height = "40",
    onClick,
  } = props;
  return (
    <Container color={color} bgColor={bgColor} onClick={onClick}>
      <Image src={src} alt={alt || ""} width={width} height={height} />
      {alt}계정으로 로그인
    </Container>
  );
};

export default AuthButton;
