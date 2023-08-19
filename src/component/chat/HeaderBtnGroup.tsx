import { ReactElement } from "react";
import PartyUserList from "./PartyUserList";

const HeaderBtnGroup = () => {
  // 헤더: 채팅 제목/ 나가기(뒤로가기) / 멤버 리스트 창 열기

  return (
    <div>
      <h3>헤더</h3>
      <PartyUserList />
    </div>
  );
};

HeaderBtnGroup.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default HeaderBtnGroup;
