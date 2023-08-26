import React from "react";
import styled from "@emotion/styled";
import SetList from "./setlist";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Setting = () => {
  return (
    <Container>
      <SetList />
    </Container>
  );
};

export default Setting;
