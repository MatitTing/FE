import styled from '@emotion/styled';
import { ColorToken } from 'styles/Color';

interface HomeHeaderProps {
  leftArea?: React.ReactNode | string;
  centerArea?: React.ReactNode | string;
  rightArea?: React.ReactNode | string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background: ${ColorToken.white};
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  padding: 15px;
  height: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  background: ${ColorToken.white};
  width: 100%;
  max-width: 768px;
  position: fixed;
  top: 0;
  z-index: 999;
  padding: 15px;
  height: 45px;
`;

const LeftSection = styled.div``;
const CenterSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const RightSection = styled.div``;

export const DefaultHeader = ({
  leftArea,
  rightArea,
  centerArea,
}: HomeHeaderProps) => {
  return (
    <Wrapper>
      <Container>
        {leftArea ? <LeftSection>{leftArea}</LeftSection> : null}
        {centerArea ? <CenterSection>{centerArea}</CenterSection> : null}
        {rightArea ? <RightSection>{rightArea}</RightSection> : null}
      </Container>
    </Wrapper>
  );
};
