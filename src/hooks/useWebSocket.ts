import { Client, IMessage } from '@stomp/stompjs';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import { InfinitePaginationChatDataType, ChatMessagesType } from 'types/chat/chat';
import router from 'next/router';
import { StompJsContext, UserInfoContext } from '@contexts/ChatProvider';

const useWebSocket = () => {
    const refreshToken = getCookie('refreshToken');
    const queryClient = useQueryClient();
    const chatInfo = useContext(UserInfoContext);
    const client = useContext(StompJsContext);
    const [isError, setError] = useState(false);
    const roomId = chatInfo?.chatRoomInfoRes.chatRoomId;

    const exit = (alertText: string) => {
        setError(true);
        router.replace('/chat');
        alert(alertText);
    };

    const publish = useCallback(
        async (message: string) => {
            if (!chatInfo?.responseChatUserList.myInfo) return;
            const {
                userProfileImg: userImage,
                chatUserId,
                nickname,
            } = chatInfo?.responseChatUserList.myInfo;
            const createAt = Date.now();

            await client?.current?.publish({
                destination: `/pub/message`,
                body: JSON.stringify({
                    type: 'TALK',
                    roomId,
                    userImage,
                    nickname,
                    chatUserId,
                    message,
                    createAt,
                }),
            });
        },
        [roomId],
    );

    const subscribe = useCallback(() => {
        client?.current?.subscribe(`/sub/chat/room/${Number(roomId)}`, async (res: IMessage) => {
            const LIST_QUERY_KEY = [API_GET_CHAT_MESSAGE_KEY, { roomId }];

            type LIST_QUERY_TYPE = InfiniteData<
                InfinitePaginationChatDataType<'responseChatDtoList', ChatMessagesType | string>,
                unknown
            >;

            await queryClient.cancelQueries({ queryKey: LIST_QUERY_KEY });

            const { createAt, userImage, message, nickname, chatUserId, type } = JSON.parse(
                res.body,
            );

            if (!chatInfo?.responseChatUserList.myInfo) return;
            const { chatUserId: chatRoomUserId } = chatInfo?.responseChatUserList.myInfo;

            // 채팅방 접속 중 강퇴
            if (type === 'EXIT' && chatUserId === chatRoomUserId) {
                client.current?.unsubscribe(chatUserId);
                exit('파티에서 나가셨습니다.');
            }

            if (type === 'TALK') {
                await queryClient.setQueryData(LIST_QUERY_KEY, (prev: LIST_QUERY_TYPE) => {
                    let newList = prev;

                    newList.pages[0].responseChatDtoList.unshift({
                        createAt,
                        message,
                        nickname,
                        chatId: createAt,
                        imgUrl: userImage,
                        messageType: 'TALK',
                        senderId: chatUserId,
                    });
                    return newList;
                });
            } else {
                await queryClient.setQueryData(LIST_QUERY_KEY, (prev: LIST_QUERY_TYPE) => {
                    let newList = prev;

                    newList.pages[0].responseChatDtoList.unshift(res.body);
                    return newList;
                });
            }

            await queryClient.invalidateQueries({
                queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
            });
        });
    }, [queryClient, roomId]);

    const connect = useCallback(() => {
        if (!client) return;

        client.current = new Client({
            brokerURL: process.env.WEB_SOCKET_URL,
            connectHeaders: {
                Authorization: String(refreshToken),
            },
            reconnectDelay: 0, // 자동 재연결
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            onConnect: () => subscribe(),
            onStompError() {
                return exit('연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
            },
        });

        client.current.activate();
    }, [refreshToken, subscribe]);

    useEffect(() => {
        const userId = chatInfo?.responseChatUserList.myInfo.chatUserId;
        const chatUserList = chatInfo?.responseChatUserList.chatRoomUserDto.some(
            ({ chatUserId }) => chatUserId === userId,
        );

        if (!chatUserList && userId) {
            exit('요청하신 콘텐츠를 찾을 수 없거나 접근 권한이 없습니다.');
            return;
        }

        connect();

        return () => {
            client?.current?.deactivate();
        };
    }, [connect, refreshToken, roomId]);

    return { chatInfo, roomId, publish, isError };
};

export default useWebSocket;
