import styled from "@emotion/styled";
import { CSSProperties, ReactEventHandler } from "react";
import { Color, ColorToken } from "styles/Color";
import { Typography } from "styles/Typography";

export interface HotKeywordTagButtonProps {
  style?: CSSProperties;
  textColor?: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Container = styled.div`
  background-color: ${Color.VeryLightGrey};
  cursor: pointer;
  height: 34px;
  width: max-content;
  padding: 6px 15px 8px 15px;
  border-radius: 30px;
  color: ${Color.DarkGrey};
  background-color: black;
  color: ${ColorToken.white};
`;

const Text = styled.div`
  width: max-content;
  ${Typography.Body.Body1Regular};
`;

export const HotKeywordTagButton = ({
  style,
  text,
  onClick,
}: HotKeywordTagButtonProps) => {
  return (
    <Container style={{ ...style }} onClick={onClick}>
      <Text>{text}</Text>
    </Container>
  );
};
