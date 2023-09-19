import styled from "@emotion/styled";
import { DefaultButton } from "@components/common/DefaultButton";
import { useState, useEffect } from "react";

interface ToggleButtonProps {
  partystate: string;
  setPartystate: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled.div<any>`
  /* position: -webkit-sticky;
  position: sticky;
  top: 48px; */
  display: flex;
  width: 100%;
  background-color: white;
  padding: 16px;
  flex-direction: row;
  gap: 10px;
  transition: top 0.3s ease;
  z-index: 9;
`;

const ButtonList = [
  {
    text: "모집중",
    value: "host",
  },
  {
    text: "참가중",
    value: "member",
  },
  {
    text: "모임완료",
    value: "done",
  },
];

const ToggleButton = ({ partystate, setPartystate }: ToggleButtonProps) => {
  return (
    <Container>
      {ButtonList.map(({ text, value }) => (
        <DefaultButton
          key={value}
          text={text}
          buttonType="toggle"
          filled={partystate === value}
          customwidth={false}
          onClick={() => {
            setPartystate(value);
          }}
        ></DefaultButton>
      ))}
    </Container>
  );
};

export default ToggleButton;
