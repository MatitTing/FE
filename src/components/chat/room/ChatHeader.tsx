import styled from '@emotion/styled';
import { ChatUserResponse } from 'types/chat/chatRooms';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import { DefaultHeader } from '@components/common/DefaultHeader';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import deletePartyUser from 'src/api/deleteChatUser';
import { useContext, useState } from 'react';
import router from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { API_GET_CHAT_ROOM_INFO } from 'src/api/getChatRoomInfo';
import ChatUserList from './ChatUserList';
import { UserInfoContext } from '@contexts/ChatProvider';

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 65px;
    background-color: #ddd;
    overflow: hidden;
`;

const Menu = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
`;

interface ChatHeaderProps {
    title: string;
    chatInfo: ChatUserResponse;
}

const ChatHeader = () => {
    const roomId = router.query.id;
    const queryClient = useQueryClient();
    const chatInfo = useContext(UserInfoContext);
    const [isOpenUserList, setIsOpenUserList] = useState(false);

    const handleOpenUserList = () => setIsOpenUserList(!isOpenUserList);

    const handleClickUserExpulsion = async (chatUserId: number) => {
        await deletePartyUser({
            roomId: String(roomId),
            targetChatUserId: chatUserId,
        });

        await queryClient.invalidateQueries({
            queryKey: [
                API_GET_CHAT_ROOM_INFO,
                {
                    chatRoomId: roomId,
                },
            ],
        });

        setIsOpenUserList(false);
    };

    const menu = (
        <Menu onClick={handleOpenUserList}>{isOpenUserList ? <CloseIcon /> : <MenuIcon />}</Menu>
    );

    return (
        <Wrapper>
            <DefaultHeader
                centerArea={chatInfo?.chatRoomInfoRes.title || ''}
                leftArea={<HeaderBackButton />}
                rightArea={menu}
            />
            <ChatUserList
                onClickUserExpulsion={handleClickUserExpulsion}
                isOpenUserList={isOpenUserList}
            />
        </Wrapper>
    );
};

export default ChatHeader;
