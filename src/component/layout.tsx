import React, { ReactNode } from "react";
import Bottombar from "./common/bottombar";
import styled from "@emotion/styled";

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  width: 768px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
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
