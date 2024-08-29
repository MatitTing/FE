import defaultRequest from 'src/lib/axios/defaultRequest';
import { ChatRoomInfoResponse } from 'types/chat/chatRooms';

interface ChatRoomInfoParams {
    chatRoomId: number;
}

export const API_GET_CHAT_ROOM_INFO = '/api/chat-rooms';

const getChatRoomInfo = async ({
    chatRoomId,
}: ChatRoomInfoParams): Promise<ChatRoomInfoResponse> => {
    const { data } = await defaultRequest.get(`${API_GET_CHAT_ROOM_INFO}/${chatRoomId}`);

    return data;
};

export default getChatRoomInfo;
