import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { NotificationBox } from "@components/notification/NotificationBox";
import styled from "@emotion/styled";
import { Color } from "styles/Color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
  gap: 30px;
  background: ${Color.Background};
  min-height: calc(100vh - 45px);
  height: 100%;
`;

const NotificationPage = () => {
  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        centerArea={<DefaultText text="알림 내역" size={20} weight={700} />}
      />
      <NotificationList>
        <NotificationBox
          title="후기가 도착했어요."
          body="오늘도 즐거웠어요."
          time="2023.10.21"
        />
      </NotificationList>
    </Container>
  );
};

export default NotificationPage;
