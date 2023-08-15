import React, { ReactNode } from "react";
import Bottombar from "./common/Bottombar";
import styled from "@emotion/styled";

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  position: relative;
  width: 768px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function Layout({ children }: LayoutProps) {
  return (
    <Container>
      {children}
      <Bottombar />
    </Container>
  );
}

export default Layout;
