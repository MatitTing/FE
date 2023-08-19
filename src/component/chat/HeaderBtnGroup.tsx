import { ReactElement, MouseEventHandler } from "react";
import PartyUserList from "./PartyUserList";
import styled from "@emotion/styled";
import router from "next/router";

const Wrapper = styled.header({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2rem",
  height: "50px",
  backgroundColor: "#ddd",
});

const BackBtn = styled.button({
  border: "none",
  backgroundColor: "transparent",
});

const ChatTitle = styled.h3({});

interface HeaderBtnGroupProps {
  isOpenUserList: boolean;
  handleOpenUserList: MouseEventHandler<HTMLButtonElement>;
}

const HeaderBtnGroup = ({
  isOpenUserList,
  handleOpenUserList,
}: HeaderBtnGroupProps) => {
  return (
    <Wrapper>
      <BackBtn onClick={() => router.back()}>뒤로가기</BackBtn>
      <ChatTitle>채팅 방 이름</ChatTitle>
      <BackBtn onClick={handleOpenUserList}>파티원 보기</BackBtn>
      <PartyUserList isOpenUserList={isOpenUserList} />
    </Wrapper>
  );
};

HeaderBtnGroup.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default HeaderBtnGroup;
