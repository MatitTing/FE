import ChatHeader from '@components/chat/room/ChatHeader';
import ChatMessage from '@components/chat/room/ChatMessage';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import getChatMessage, { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import getChatRoomInfo, { API_GET_CHAT_ROOM_INFO } from 'src/api/getChatRoomInfo';
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import useWebSocket from '@hooks/useWebSocket';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ChatForm from './ChatForm';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
    max-width: 760px;
    min-width: 320px;
    overflow: hidden;
`;

interface ChattingRoomProps {
    roomId: number;
}

const ChatRoom = ({ roomId }: ChattingRoomProps) => {
    const { publish } = useWebSocket(roomId);
    const methods = useForm<{ message: string }>({
        resolver: yupResolver(
            yup.object({
                message: yup.string().required(),
            }),
        ),
        mode: 'onSubmit',
    });

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

    const {
        fetchNextPage,
        hasNextPage,
        data: chatMessages,
    } = useSuspenseInfiniteQuery({
        queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
        queryFn: ({ pageParam = 0 }) => getChatMessage({ roomId, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.pageInfo?.hasNext) {
                return lastPage.pageInfo.page + 1;
            }
        },
    });

    const handleSubmit: SubmitHandler<FieldValues> = async (formData) => {
        if (!chatInfo?.responseChatUserList.myInfo) return;
        const { myInfo } = chatInfo?.responseChatUserList;

        publish(myInfo, formData.message);
        methods.reset();
    };

    const onObserve = () => hasNextPage && fetchNextPage();
    const messages = chatMessages.pages.map((page) => page.responseChatDtoList).flat();

    return (
        <FormProvider {...methods}>
            <Wrapper>
                {chatInfo ? (
                    <>
                        <ChatHeader
                            chatInfo={chatInfo?.responseChatUserList}
                            title={chatInfo?.chatRoomInfoRes?.title}
                        />
                        <ChatMessage
                            userNickname={chatInfo?.responseChatUserList.myInfo?.nickname}
                            messages={messages}
                            onObserve={onObserve}
                            observerMinHeight="10px"
                        />
                    </>
                ) : null}
                <ChatForm onSubmit={handleSubmit} />
            </Wrapper>
        </FormProvider>
    );
};

export default ChatRoom;
