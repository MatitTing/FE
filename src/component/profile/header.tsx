import styled from "@emotion/styled";
import BackIcon from "@assets/icons/common/close";

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  padding: 8px;
  height: 60px;
  background-color: aliceblue;
`;

const Header = () => {
  return (
    <Container>
      <BackIcon />
    </Container>
  );
};

export default Header;
