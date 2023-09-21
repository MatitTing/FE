import React from "react";
import TextInput from "@components/common/TextInput";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;

const SetNickname = () => {
  return (
    <Container>
      <TextInput />
    </Container>
  );
};

export default SetNickname;
