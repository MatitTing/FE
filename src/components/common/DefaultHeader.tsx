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
  left: 0;
  z-index: 999;
  height: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;
const Container = styled.div`
  display: flex;
  background: ${ColorToken.white};
  width: 100%;
  justify-content: space-between;
  padding: 15px;
`;

const LeftSection = styled.div``;
const CenterSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
        {leftArea ? <LeftSection>{leftArea}</LeftSection> : <span></span>}
        {centerArea ? <CenterSection>{centerArea}</CenterSection> : null}
        {rightArea ? <RightSection>{rightArea}</RightSection> : <span></span>}
      </Container>
    </Wrapper>
  );
};
