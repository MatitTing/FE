import ChatHeader from '@components/chat/room/ChatHeader';
import MessageList from '@components/chat/room/MessageList';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { MouseEvent, useState } from 'react';
import getChatMessage, { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import getChatRoomInfo, { API_GET_CHAT_ROOM_INFO_KEY } from 'src/api/getChatRoomInfo';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import useChat from '@hooks/useChat';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NewColor } from 'styles/Color';

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

const Contents = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 1rem;
    background-color: ${NewColor.primary};
`;

const SubmitButton = styled.button`
    width: 50px;
    border: none;
    color: #fff;
`;

const TextArea = styled.textarea`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    width: 100%;
    font-size: 14px;
    border-radius: 5px;
    color: ${NewColor.text_primary};
    line-height: 1.5;
    outline: none;
    border: none;
    resize: none;
`;

interface ChattingRoomProps {
    roomId: number;
}

const ChatRoom = ({ roomId }: ChattingRoomProps) => {
    const { publish } = useChat(roomId);
    const methods = useForm<{ message: string }>({
        resolver: yupResolver(
            yup.object({
                message: yup.string().required(),
            }),
        ),
        mode: 'onSubmit',
    });
    const [isOpenUserList, setIsOpenUserList] = useState(false);

    const { data: roomInfo } = useQuery({
        queryKey: [
            API_GET_CHAT_ROOM_INFO_KEY,
            {
                chatRoomId: roomId,
            },
        ],
        queryFn: () =>
            getChatRoomInfo({
                chatRoomId: roomId,
            }),
    });

    const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
        queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
        queryFn: ({ pageParam = 0 }) => getChatMessage({ roomId, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.pageInfo?.hasNext) {
                return lastPage.pageInfo.page + 1;
            }
        },
    });

    const handleOpenUserList = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpenUserList(!isOpenUserList);
    };

    const onSubmit: SubmitHandler<{ message: string }> = async ({
        message,
    }: {
        message: string;
    }) => {
        if (!roomInfo?.responseChatUserList.myInfo) return;
        const { myInfo } = roomInfo?.responseChatUserList;

        publish(myInfo, message);
        methods.reset();
    };

    const onObserve = () => hasNextPage && fetchNextPage();
    const messages = data.pages.map((page) => page.responseChatDtoList).flat();

    return (
        <Wrapper>
            {roomInfo ? (
                <ChatHeader
                    isOpenUserList={isOpenUserList}
                    handleOpenUserList={handleOpenUserList}
                    roomInfo={roomInfo}
                />
            ) : null}
            <Contents>
                {roomInfo ? (
                    <MessageList
                        myInfo={roomInfo?.responseChatUserList.myInfo}
                        messages={messages}
                        onObserve={onObserve}
                        observerMinHeight="10px"
                    />
                ) : null}
                <FormProvider {...methods}>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextArea {...methods.register('message')} rows={1} />
                        <SubmitButton type="submit">전송</SubmitButton>
                    </Form>
                </FormProvider>
            </Contents>
        </Wrapper>
    );
};

export default ChatRoom;
