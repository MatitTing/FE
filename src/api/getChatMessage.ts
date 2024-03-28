import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { ChatMessageResponse } from "types/chat/chat";

interface ChatMessageParams {
  roomId: string;
  size: string;
  lastChatRoomId: string;
}

export const API_GET_CHAT_MESSAGE_KEY =
  "/api/chat/{{roomId}}?size={{size}}&lastChatRoomId={{lastChatRoomId}}";

const getChatMessage = async ({
  roomId,
  size,
  lastChatRoomId,
}: ChatMessageParams): Promise<ChatMessageResponse[]> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_CHAT_MESSAGE_KEY, {
      size,
      lastChatRoomId,
      roomId,
    })
  );
  return data;
};

export default getChatMessage;
