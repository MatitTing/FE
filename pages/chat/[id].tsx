import BottomInputGroup from "@component/chat/BottomInputGroup";
import HeaderBtnGroup from "@component/chat/HeaderBtnGroup";
import MessageList from "@component/chat/MessageList";
import styled from "@emotion/styled";
import { ChangeEvent, ReactElement, MouseEvent, useState } from "react";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100vh",
});

const Contents = styled.main({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

const ChattingRoom = () => {
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
