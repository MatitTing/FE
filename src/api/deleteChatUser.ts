import defaultRequest from 'src/lib/axios/defaultRequest';

interface ChatUserParams {
    roomId: string;
    targetChatUserId: number;
}

const deletePartyUser = async ({ roomId, targetChatUserId }: ChatUserParams) => {
    await defaultRequest.delete(`/api/chat/${roomId}`, { data: { targetChatUserId } });
};

export default deletePartyUser;
