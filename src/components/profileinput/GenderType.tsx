import React from "react";
import { DefaultButton } from "@components/common/DefaultButton";
import { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 40px;
`;

const GenderType = () => {
  const [seletedIndex, setIndex] = useState(0);

  const genders = [{ type: "남성" }, { type: "여성" }];

  return (
    <Container>
      {genders.map(({ type }, index) => (
        <DefaultButton
          key={type}
          text={type}
          filled={index === seletedIndex}
          onClick={() => {
            setIndex(index);
          }}
          style={{
            width: "100%",
          }}
        />
      ))}
    </Container>
  );
};

export default GenderType;
