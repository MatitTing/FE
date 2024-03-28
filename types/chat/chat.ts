export interface ChatMessageResponse {
  responseChatDtoList: {
    chatId: number;
    senderId: number;
    nickname: string;
    message: string;
    createAt: string;
  };
  pageInfo: {
    lastPartyId: number;
    hasNext: boolean;
  };
}
