import Bottombar from '@components/common/bottombar';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  width: 768px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  header {
    height: calc(100% - 75px);
    overflow-y: scroll;
  }
`;
const BottomSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <header>{children}</header>
      <BottomSection>
        <Bottombar />
      </BottomSection>
    </Container>
  );
}

export default Layout;
