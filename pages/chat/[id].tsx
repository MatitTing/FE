import BottomInputGroup from "@component/chat/BottomInputGroup";
import HeaderBtnGroup from "@component/chat/HeaderBtnGroup";
import MessageList from "@component/chat/MessageList";
import { ChangeEvent, ReactElement, useEffect } from "react";

const ChatRoomPage = () => {
  // 헤더
  // 채팅 방 제목 설정(미정)
  // 나가기
  // 뒤로가기
  // 멤버 리스트 창 열기 버튼 (리스트에서 멤버 강퇴)

  const onChanegChat = (e: ChangeEvent<HTMLInputElement>) => {
    //
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "2rem",
        height: "100vh",
      }}
    >
      <header>
        <HeaderBtnGroup />
      </header>
      <main>
        <MessageList />
      </main>
      <BottomInputGroup />
    </div>
  );
};

ChatRoomPage.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default ChatRoomPage;
