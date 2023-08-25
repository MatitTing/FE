import styled from '@emotion/styled';
import { ColorToken } from 'styles/Color';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${ColorToken.white};
  border: 1px solid green;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  max-width: 768px;
  padding: 15px;
`;

export const HomeHeader = () => {
  return (
    <Container>
      <div>left</div>
      <div>right</div>
    </Container>
  );
};
