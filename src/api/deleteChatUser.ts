import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";

interface ChatUserParams {
  roomId: string;
  targetId: string;
}

export const API_DELETE_CHAT_USER_KEY =
  "/api/chat/{{roomId}}?targetId={{targetId}}";

const deletePartyDetail = async ({ roomId, targetId }: ChatUserParams) => {
  await defaultRequest.delete(
    variableAssignMent(API_DELETE_CHAT_USER_KEY, { roomId, targetId })
  );
};

export default deletePartyDetail;
