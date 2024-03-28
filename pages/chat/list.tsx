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

const Wrapper = styled.div``;

const Header = styled.header`
  height: 45px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Contents = styled.div`
  padding: 2rem;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const SearchButton = styled.button`
  min-width: 50px;
`;
const RoomList = styled.ul`
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;

const Room = styled.li`
  display: flex;
  margin: 1rem 0;
  padding: 1rem 0;
`;

const ImageBox = styled.div`
  width: 60;
  height: 60;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5%;
`;

const RightBox = styled.div`
  width: calc(100% - 60px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NickName = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const Message = styled.p`
  margin: 0;
`;
const Recentime = styled.p``;

const ChatListPage: NextPage = () => {
  const handleOnChangeSearch = () => {};
  const handleOnClickSearch = () => {};

  return (
    <Wrapper>
      <Header>채팅방</Header>
      <Contents>
        <SearchBox>
          <TextInput
            placeholder="채팅방 검색"
            onChange={handleOnChangeSearch}
          />
          <SearchButton onClick={handleOnClickSearch}>검색</SearchButton>
        </SearchBox>
        <RoomList>
          {mockupData.map((item) => {
            const { img, nickName, time, message } = item;

            return (
              <Room key={nickName}>
                <ImageBox style={{}}>
                  <Image width="70" height="70" src={img} alt="profile" />
                </ImageBox>
                <RightBox>
                  <TextBox>
                    <NickName>{nickName}</NickName>
                    <Message>{message}</Message>
                  </TextBox>
                  <Recentime>{time}</Recentime>
                </RightBox>
              </Room>
            );
          })}
        </RoomList>
      </Contents>
    </Wrapper>
  );
};

export default ChatListPage;
