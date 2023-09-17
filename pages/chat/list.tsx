import TextInput from "@components/common/TextInput";
import styled from "@emotion/styled";
import Image from "next/image";
import { NextPage } from "next";

const mockupData = [
  {
    img: "https://cdn.pixabay.com/photo/2023/09/04/06/59/dog-8232158_1280.jpg",
    nickName: "gafar Usman",
    time: "12:34 AM",
    message: "안녕하세요",
  },
  {
    img: "https://cdn.pixabay.com/photo/2023/08/18/01/32/cat-8197577_1280.jpg",
    nickName: "HOD",
    time: "12:34 AM",
    message: "신청합니다.",
  },
  {
    img: "https://cdn.pixabay.com/photo/2023/06/18/07/31/willow-warbler-8071472_1280.jpg",
    nickName: "Habeeb",
    time: "12:34 AM",
    message: "반갑습니다.",
  },
];

const Wrapper = styled.div({
  padding: "2rem",
});

const SearchBox = styled.div({
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

const SearchButton = styled.button({
  minWidth: "50px",
});

const RoomList = styled.ul({
  padding: 0,
  margin: "0 auto",
  listStyle: "none",
});

const Room = styled.li({
  display: "flex",
  margin: "1rem 0",
  padding: "1rem 0",
});

const ImageBox = styled.div({
  width: 60,
  height: 60,
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "5%",
});

const Contents = styled.div({
  width: "calc(100% - 60px)",
  display: "flex",
  justifyContent: "space-between",
});

const TextBox = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const NickName = styled.p({
  margin: 0,
  fontSize: "18px",
  fontWeight: "bold",
});

const Message = styled.p({
  margin: 0,
});

const Recentㅆime = styled.p({});

const ChatListPage: NextPage = () => {
  return (
    <Wrapper>
      <SearchBox>
        <TextInput />
        <SearchButton>검색</SearchButton>
      </SearchBox>

      <RoomList>
        {mockupData.map((item) => {
          const { img, nickName, time, message } = item;

          return (
            <Room key={nickName}>
              <ImageBox style={{}}>
                <Image width="70" height="70" src={img} alt="profile" />
              </ImageBox>
              <Contents>
                <TextBox>
                  <NickName>{nickName}</NickName>
                  <Message>{message}</Message>
                </TextBox>
                <Recentㅆime>{time}</Recentㅆime>
              </Contents>
            </Room>
          );
        })}
      </RoomList>
    </Wrapper>
  );
};

export default ChatListPage;
