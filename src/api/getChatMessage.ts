import defaultRequest from 'src/lib/axios/defaultRequest';
import { ChatMessagesType, InfinitePaginationChatDataType } from 'types/chat/chat';

interface ChatMessageParams {
    roomId: string;
    page: number;
}

export const API_GET_CHAT_MESSAGE_KEY = '/api/chat/{{roomId}}?page={{page}}';

const getChatMessage = async ({ roomId, page }: ChatMessageParams) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationChatDataType<'responseChatDtoList', ChatMessagesType>
    >(`/api/chat/${roomId}`, { params: { page } });

    return data;
};

export default getChatMessage;
