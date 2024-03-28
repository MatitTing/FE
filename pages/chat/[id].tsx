import BottomInputGroup from "@components/chat/BottomInputGroup";
import HeaderBtnGroup from "@components/chat/HeaderBtnGroup";
import MessageList from "@components/chat/MessageList";
import styled from "@emotion/styled";
import * as StompJs from "@stomp/stompjs";
import { ReactElement, MouseEvent, useState, useEffect, useRef } from "react";

const Wrapper = styled.div`
  display: "flex";
  flex-direction: "column";
  justify-content: "space-between";
  height: "100vh";
`;

const Contents = styled.main`
  display: "flex";
  flex-direction: "column";
  justify-content: "flex-end";
`;

const ChattingRoom = () => {
  const client = useRef<any>({});

  const [isOpenUserList, setIsOpenUserList] = useState(false);

  const handleCloseUserList = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpenUserList(false);
  };

  const handleOpenUserList = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpenUserList(true);
  };

  return (
    <Wrapper onClick={handleCloseUserList}>
      <HeaderBtnGroup
        isOpenUserList={isOpenUserList}
        handleOpenUserList={handleOpenUserList}
      />
      <Contents>
        <MessageList />
        <BottomInputGroup />
      </Contents>
    </Wrapper>
  );
};

ChattingRoom.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default ChattingRoom;
