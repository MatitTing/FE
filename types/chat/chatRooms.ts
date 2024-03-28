export interface ChatRoomsResponse {
  responseChatRoomDtoList: {
    roomId: number;
    title: string;
    lastUpdate: string;
  };
  pageInfo: {
    lastPartyId: number;
    hasNext: boolean;
  };
}

export interface ChatRoomInfoResponse {
  chatRoomId: number;
  title: string;
  masterId: number;
  partyId: number;
}

export interface ChatUserListResponse {
  chatUserId: number;
  role: string;
  nickname: string;
}
