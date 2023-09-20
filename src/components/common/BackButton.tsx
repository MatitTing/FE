import styled from "@emotion/styled";
import BackIcon from "@components/icons/common/Back.icon";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  height: 100%;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
`;

const BackButton = () => {
  const router = useRouter();

  return (
    <Container
      onClick={() => {
        router.back();
      }}
    >
      {BackIcon()}
    </Container>
  );
};

export default BackButton;
