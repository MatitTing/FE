import PartyUserList from './PartyUserList';
import styled from '@emotion/styled';
import { ChatRoomInfoResponse } from 'types/chat/chatRooms';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import { DefaultHeader } from '@components/common/DefaultHeader';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import deletePartyUser from 'src/api/deleteChatUser';
import { useState } from 'react';
import router from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { API_GET_CHAT_ROOM_INFO_KEY } from 'src/api/getChatRoomInfo';
import { API_GET_CHAT_ROOMS_KEY } from 'src/api/getChatRooms';

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: #ddd;
`;

const MenuBtn = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
`;

interface ChatHeaderProps {
    roomInfo: ChatRoomInfoResponse;
}

const ChatHeader = ({ roomInfo }: ChatHeaderProps) => {
    const roomId = router.query.id;
    const queryClient = useQueryClient();
    const [isOpenUserList, setIsOpenUserList] = useState(false);
    const { chatRoomId, title } = roomInfo.chatRoomInfoRes;

    const handleClickBack = async () =>
        await queryClient.invalidateQueries({
            queryKey: [API_GET_CHAT_ROOMS_KEY],
        });

    const handleOpenUserList = async () => setIsOpenUserList(!isOpenUserList);

    const handleClickUserExpulsion = async (chatUserId: number) => {
        await deletePartyUser({
            roomId: String(roomId),
            targetChatUserId: chatUserId,
        });

        await queryClient.invalidateQueries({
            queryKey: [
                API_GET_CHAT_ROOM_INFO_KEY,
                {
                    chatRoomId,
                },
            ],
        });

        setIsOpenUserList(false);
    };

    const menu = (
        <MenuBtn onClick={handleOpenUserList}>
            {isOpenUserList ? <CloseIcon /> : <MenuIcon />}
        </MenuBtn>
    );

    const back = (
        <div onClick={handleClickBack}>
            <HeaderBackButton />
        </div>
    );

    return (
        <Wrapper>
            <DefaultHeader centerArea={title} leftArea={back} rightArea={menu} />
            <PartyUserList
                onClickUserExpulsion={handleClickUserExpulsion}
                isOpenUserList={isOpenUserList}
                chatUser={roomInfo?.responseChatUserList}
            />
        </Wrapper>
    );
};

export default ChatHeader;
