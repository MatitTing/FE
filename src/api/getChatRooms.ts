import defaultRequest from 'src/lib/axios/defaultRequest';
import { ChatRoomsResponse } from 'types/chat/chatRooms';
export const API_GET_CHAT_ROOMS = '/api/chat-rooms';

const getChatRooms = async (params: number): Promise<ChatRoomsResponse> => {
    const { data } = await defaultRequest.get(API_GET_CHAT_ROOMS, { params });

    return data;
};

export default getChatRooms;
