import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { ChatUserListResponse } from "types/chat/chatRooms";

type RoomId = { roomid: string };

export const API_GET_CHAT_USER_LIST_KEY = "/api/chat-rooms/user/{{roomId}}";

const getChatUserList = async ({
  roomid,
}: RoomId): Promise<ChatUserListResponse[]> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_CHAT_USER_LIST_KEY, { roomid })
  );
  return data;
};

export default getChatUserList;
