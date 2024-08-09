import defaultRequest from 'src/lib/axios/defaultRequest';
import { InfinitePaginationChatDataType, SearchChatRoomsResponse } from 'types/chat/chat';

interface SearchChatRoomsParams {
    title: string;
    page: number;
}

export const API_GET_SEARCH_CHAT_ROOMS_KEY = '/api/chat-rooms/search';

const getSearchChatRooms = async ({ title, page }: SearchChatRoomsParams) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationChatDataType<'responseChatRoomDtoList', SearchChatRoomsResponse>
    >(`/api/chat-rooms/search`, { params: { title, page } });

    return data;
};

export default getSearchChatRooms;
