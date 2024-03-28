import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { ChatRoomsResponse } from "types/chat/chatRooms";

interface ChatRoomsParams {
  size: string;
  lastChatRoomId: string;
}

export const API_GET_CHAT_ROOMS_KEY =
  "/api/chat-rooms?size={{size}}&lastChatRoomId={{lastChatRoomId}}";

const getChatRooms = async ({
  size,
  lastChatRoomId,
}: ChatRoomsParams): Promise<ChatRoomsResponse[]> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_CHAT_ROOMS_KEY, { size, lastChatRoomId })
  );
  return data;
};

export default getChatRooms;
