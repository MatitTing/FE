import { Client, IMessage } from '@stomp/stompjs';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { useCallback, useEffect, useRef } from 'react';
import { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import { InfinitePaginationChatDataType, ChatMessagesType } from 'types/chat/chat';
import { MyInfo } from 'types/chat/chatRooms';
import router from 'next/router';

const useWebSocket = (roomId: number) => {
    const refreshToken = getCookie('refreshToken');
    const queryClient = useQueryClient();
    const client = useRef<Client | null>(null);

    const publish = useCallback(
        async ({ userProfileImg: userImage, chatUserId, nickname }: MyInfo, message: string) => {
            const createAt = Date.now();

            await client.current?.publish({
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
        client.current?.subscribe(`/sub/chat/room/${Number(roomId)}`, async (res: IMessage) => {
            const LIST_QUERY_KEY = [API_GET_CHAT_MESSAGE_KEY, { roomId }];

            type LIST_QUERY_TYPE = InfiniteData<
                InfinitePaginationChatDataType<'responseChatDtoList', ChatMessagesType | string>,
                unknown
            >;
            await queryClient.cancelQueries({ queryKey: LIST_QUERY_KEY });

            const { createAt, userImage, message, nickname, chatUserId, type } = JSON.parse(
                res.body,
            );
            if (type === 'TALK') {
                await queryClient.setQueryData(LIST_QUERY_KEY, (prev: LIST_QUERY_TYPE) => {
                    let newList = prev;

                    newList.pages[0].responseChatDtoList.unshift({
                        createAt,
                        message,
                        nickname,
                        chatId: createAt,
                        imgUrl: userImage,
                        type: 'TALK',
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
                alert('연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
                router.replace('/');
            },
        });

        client.current.activate();
    }, [refreshToken, subscribe]);

    useEffect(() => {
        connect();

        return () => {
            client.current?.deactivate();
        };
    }, [connect, refreshToken, roomId]);

    return { publish };
};

export default useWebSocket;
