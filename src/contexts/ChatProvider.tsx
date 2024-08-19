import { Client } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import { createContext, FC, MutableRefObject, PropsWithChildren, useRef } from 'react';
import getChatRoomInfo, { API_GET_CHAT_ROOM_INFO } from 'src/api/getChatRoomInfo';
import { ChatRoomInfoResponse } from 'types/chat/chatRooms';
export const StompJsContext = createContext<MutableRefObject<Client | null> | null>(null);
export const UserInfoContext = createContext<ChatRoomInfoResponse | undefined>(undefined);

const ChatProvider: FC<PropsWithChildren<{ roomId: number }>> = ({ children, roomId }) => {
    const client = useRef<Client | null>(null);

    const { data: chatInfo } = useQuery({
        queryKey: [
            API_GET_CHAT_ROOM_INFO,
            {
                chatRoomId: roomId,
            },
        ],
        queryFn: () =>
            getChatRoomInfo({
                chatRoomId: roomId,
            }),
    });

    return (
        <StompJsContext.Provider value={client}>
            <UserInfoContext.Provider value={chatInfo}>{children}</UserInfoContext.Provider>
        </StompJsContext.Provider>
    );
};

export default ChatProvider;
