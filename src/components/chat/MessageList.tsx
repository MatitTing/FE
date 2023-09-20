import styled from "@emotion/styled";
import { ReactElement } from "react";
import { shouldNotForwardProp } from "@utils/common";
// import Image from "next/image";

const messages = [
  {
    img: "",
    readCheck: true,
    message: "안녕하세요",
    id: "me",
  },
  {
    img: "",
    readCheck: true,
    message: "신청합니다.",
    id: "me",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Gz1Gq9Lp3gtG9pm5qT9W8D2PxWMCmb2FLBeoyPo&s",
    nickName: "Habeeb",
    readCheck: false,
    message: "반갑습니다.",
  },
];

const List = styled.ul({
  padding: "0 2rem",
  margin: "0 auto",
  listStyle: "none",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const ListItem = styled(
  "li",
  shouldNotForwardProp("userCheck")
)<{ userCheck?: string }>(({ userCheck }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: userCheck === "me" ? "row-reverse" : "row",
  margin: "1rem 0",
}));

const ImageBox = styled.div({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "20px",
});

const MessageBox = styled(
  "div",
  shouldNotForwardProp("userCheck")
)<{ userCheck?: string }>(({ userCheck }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: userCheck === "me" ? "#efebec" : "#efebec",
  borderRadius: "10px",
}));

const TextBox = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const NickName = styled(
  "p",
  shouldNotForwardProp("userCheck")
)<{ userCheck?: string }>(({ userCheck }) => ({
  marginTop: 0,
  marginBottom: userCheck === "me" ? 0 : "10px",
  fontSize: "18px",
  fontWeight: "bold",
}));

const Message = styled(
  "p",
  shouldNotForwardProp("userCheck")
)<{ userCheck?: string }>(({ userCheck }) => ({
  margin: 0,
  color: userCheck === "me" ? "#fff" : "#000",
}));

const ReadMark = styled(
  "div",
  shouldNotForwardProp("userCheck")
)<{ userCheck?: string }>(({ userCheck }) => ({
  marginLeft: userCheck === "me" ? "15px" : "0px",
  marginRight: userCheck === "me" ? "0px" : "15px",
  alignSelf: "flex-end",
  color: "rosybrown",
}));

const MessageList = () => {
  return (
    <List>
      {messages.reverse().map(({ img, nickName, readCheck, message, id }) => (
        <ListItem key={nickName} userCheck={id}>
          {img && (
            <ImageBox>
              {/* nextjs 도메인 설정 후 next Image로 변경 */}
              <img src={img} width="50" height="50" alt="profile" />
            </ImageBox>
          )}
          <MessageBox userCheck={id}>
            <TextBox>
              <NickName userCheck={id}>{nickName}</NickName>
              <Message>{message}</Message>
            </TextBox>
          </MessageBox>
          <ReadMark>{readCheck ? 1 : ""}</ReadMark>
        </ListItem>
      ))}
    </List>
  );
};

MessageList.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default MessageList;
