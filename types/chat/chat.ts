export type InfinitePaginationChatDataType<K extends string, T> = {
    [key in K]: T[];
} & {
    pageInfo: {
        page: number;
        hasNext: boolean;
    };
};

export type ChatMessagesType = {
    chatId: string;
    createAt: string;
    imgUrl: string;
    message: string;
    messageType: 'TALK' | 'ENTER' | 'EXIT';
    nickname: string;
    senderId: number;
};

export interface SearchChatRoomsResponse {
    roomId: number;
    title: string;
    thumbnail: string;
    lastMessage: string;
    lastUpdate: string;
    lastMessageTime: string;
}
