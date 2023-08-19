import styled from "@emotion/styled";
import { shouldNotForwardProp } from "@utils/common";
import { ReactElement } from "react";

const userList = [
  {
    img: "",
    nickName: "아무개",
    id: "me",
  },
  {
    img: "",
    nickName: "아무개2",
    id: 0,
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Gz1Gq9Lp3gtG9pm5qT9W8D2PxWMCmb2FLBeoyPo&s",
    nickName: "아무개3",
    id: 1,
  },
];

const Wrapper = styled(
  "div",
  shouldNotForwardProp("isOpenUserList")
)<{ isOpenUserList: boolean }>(({ isOpenUserList }) => ({
  position: "fixed",
  top: 0,
  right: isOpenUserList ? 0 : "-40vw",
  zIndex: 99999,
  width: "40vw",
  maxWidth: "310px",
  height: "100%",
  backgroundColor: "#fff",
  transition: "all 0.5s ease-out",
}));

const Header = styled.header({
  padding: "1rem 2rem",
  height: "50px",
});

const List = styled.ul({
  padding: "0 2rem",
});

const ListItem = styled.li({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 0",
});

const UserInfo = styled.div({
  display: "flex",
  alignItems: "center",
});

const ImageBox = styled.div({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "10px",
  backgroundColor: "skyblue",
});

const NickName = styled.p({});

const Expulsion = styled.button({});

const Label = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "5px",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  fontSize: "8px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#6c6c6c",
});

interface PartyUserListProps {
  isOpenUserList: boolean;
}

const PartyUserList = ({ isOpenUserList }: PartyUserListProps) => {
  const handleClickUserExpulsion = () => {};

  return (
    <Wrapper isOpenUserList={isOpenUserList}>
      <Header>파티원 리스트 입니다.</Header>
      <List>
        {userList
          .slice(0)
          .reverse()
          .map(({ img, nickName, id }) => (
            <ListItem key={nickName}>
              <UserInfo>
                <ImageBox>
                  {img && (
                    <img width="30" height="30" src={img} alt="profile" />
                  )}
                </ImageBox>
                {id === "me" && <Label>나</Label>}
                <NickName>{nickName}</NickName>
              </UserInfo>
              {/* 방장일 경우 표시 */}
              <Expulsion onClick={handleClickUserExpulsion}>강퇴하기</Expulsion>
            </ListItem>
          ))}
      </List>
    </Wrapper>
  );
};

PartyUserList.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default PartyUserList;
