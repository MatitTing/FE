export interface ChatRoomsResponse {
    responseChatRoomDtoList: ChatRoomList[];
    pageInfo: {
        page: number;
        hasNext: boolean;
    };
}

export interface ChatRoomList {
    roomId: number;
    title: string;
    lastUpdate: string;
    lastMessage: string;
    lastMessageTime: string;
    thumbnail: string;
}

export interface ChatRoomInfoResponse {
    chatRoomInfoRes: ChatRoomInfo;
    responseChatUserList: ChatUserResponse;
}

export interface ChatRoomInfo {
    chatRoomId: number;
    title: string;
    masterId: number;
    partyId: number;
}

export interface ChatUserResponse {
    chatRoomUserDto: ChatUserListResponse[];
    chatUserInfo: ChatUserInfo;
}

export interface ChatUserInfo {
    chatUserId: number;
    nickname: string;
    role: string;
    userProfileImg: string;
}
export interface ChatUserListResponse {
    chatUserId: number;
    leader: boolean;
    role: string;
    nickname: string;
    userProfileImg: string;
}
