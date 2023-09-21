import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import SearchIcon from "@components/icons/bottombar/Search.icon";
import { ArrowIcon } from "@components/icons/header/Arrow.icon";
import { NotificationIcon } from "@components/icons/header/Notification.icon";
import { HomeList } from "@components/pages/home/HomeList";
import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Color } from "styles/Color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  gap: 50px;
  width: 100%;
  max-width: 768px;
  background: ${Color.VeryLightGrey};
  display: flex;
  flex-direction: column;
`;

const HeaderAreaContainer = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const centerArea = () => {
    return (
      <HeaderAreaContainer>
        <DefaultText size={15} text="지역명 추후 지정" />
        <ArrowIcon
          styles={{
            marginTop: "-1px",
          }}
        />
      </HeaderAreaContainer>
    );
  };
  const rightArea = () => {
    return (
      <HeaderAreaContainer>
        <div onClick={() => router.push("/search")}>
          <SearchIcon />
        </div>
        <NotificationIcon
          notificationCount={0}
          styles={{
            marginTop: "-5px",
          }}
        />
      </HeaderAreaContainer>
    );
  };

  return (
    <Container>
      <DefaultHeader centerArea={centerArea()} rightArea={rightArea()} />
      <HomeList />
    </Container>
  );
};

export default Home;
