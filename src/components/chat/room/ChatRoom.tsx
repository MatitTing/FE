import ChatHeader from '@components/chat/room/ChatHeader';
import ChatMessage from '@components/chat/room/ChatMessage';
import styled from '@emotion/styled';
import getChatMessage, { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import useWebSocket from '@hooks/useWebSocket';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ChatForm from './ChatForm';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';

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

const List = styled.ul`
    padding: 0 2rem;
    margin: 0 auto;
    list-style: none;
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
`;

const ChatRoom = () => {
    const { chatInfo, roomId, publish, isError } = useWebSocket();
    const methods = useForm<{ message: string }>({
        resolver: yupResolver(
            yup.object({
                message: yup.string().required(),
            }),
        ),
        mode: 'onSubmit',
    });

    const {
        fetchNextPage,
        hasNextPage,
        data: chatMessages,
    } = useSuspenseInfiniteQuery({
        queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
        queryFn: ({ pageParam = 0 }) =>
            roomId ? getChatMessage({ roomId, page: pageParam }) : null,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage?.pageInfo?.hasNext) {
                return lastPage?.pageInfo.page + 1;
            }
        },
    });

    const handleSubmit: SubmitHandler<FieldValues> = async (formData) => {
        publish(formData.message);
        methods.reset();
    };

    const onObserve = () => hasNextPage && fetchNextPage();
    const messages = chatMessages.pages.map((page) => page?.responseChatDtoList || []).flat();
    const userName = chatInfo?.responseChatUserList.myInfo.nickname;

    if (isError) return <></>;

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <ChatHeader />
                <List>
                    {userName && messages ? (
                        <ChatMessage messages={messages} userName={userName} />
                    ) : null}
                    <ObserverTrigger onObserve={onObserve} observerMinHeight="10px" />
                </List>
                <ChatForm onSubmit={handleSubmit} />
            </Wrapper>
        </FormProvider>
    );
};

export default ChatRoom;
