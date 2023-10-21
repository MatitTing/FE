import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import SetList from "@components/setting/SetList";
import { HeaderBackButton } from "@components/common/HeaderBackButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  gap: 50px;
  width: 100%;
  max-width: 768px;
  padding-top: 45px;
`;

const Profile = () => {
  return (
    <Container>
      <DefaultHeader leftArea={<HeaderBackButton />} />
      <SetList />
    </Container>
  );
};

export default Profile;
