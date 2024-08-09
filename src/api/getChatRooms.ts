import variableAssignMent from '@utils/variableAssignment';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { ChatRoomsResponse } from 'types/chat/chatRooms';
export const API_GET_CHAT_ROOMS_KEY = '/api/chat-rooms?page={{page}}';

const getChatRooms = async (page: number): Promise<ChatRoomsResponse> => {
    const { data } = await defaultRequest.get(
        variableAssignMent(API_GET_CHAT_ROOMS_KEY, { page: String(page) }),
    );

    return data;
};

export default getChatRooms;
