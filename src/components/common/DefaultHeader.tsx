import styled from "@emotion/styled";
import { ColorToken } from "styles/Color";

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
  flex: 1 1 1;
  background: ${ColorToken.white};
  width: 100%;
  max-width: 768px;
  position: fixed;
  top: 0;
  z-index: 999;
  padding: 15px;
  height: 45px;
`;

const LeftSection = styled.div`
  width: calc(100% / 3) px;
`;
const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% / 3) px;
`;
const RightSection = styled.div`
  width: calc(100% / 3) px;
`;

export const DefaultHeader = ({
  leftArea,
  rightArea,
  centerArea,
}: HomeHeaderProps) => {
  return (
    <Wrapper>
      <Container>
        <LeftSection>{leftArea}</LeftSection>
        <CenterSection>{centerArea}</CenterSection>
        <RightSection>{rightArea}</RightSection>
      </Container>
    </Wrapper>
  );
};
