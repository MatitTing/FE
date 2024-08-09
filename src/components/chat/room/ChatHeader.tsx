import { ReactElement, MouseEventHandler } from 'react';
import PartyUserList from './PartyUserList';
import ListIcon from '@mui/icons-material/List';
import styled from '@emotion/styled';
import { ChatRoomInfoResponse } from 'types/chat/chatRooms';
import { HeaderBackButton } from '@components/common/HeaderBackButton';

interface ChatHeaderProps {
    roomInfo: ChatRoomInfoResponse;
    isOpenUserList: boolean;
    handleOpenUserList: MouseEventHandler<HTMLButtonElement>;
}

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 2rem;
    height: 50px;
    background-color: #ddd;
`;

const MenuBtn = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
`;

const ChatTitle = styled.h3``;

const ChatHeader = ({ roomInfo, isOpenUserList, handleOpenUserList }: ChatHeaderProps) => (
    <Wrapper>
        <HeaderBackButton />
        <ChatTitle>{roomInfo?.chatRoomInfoRes.title}</ChatTitle>
        <MenuBtn onClick={handleOpenUserList}>
            <ListIcon fontSize="large" />
        </MenuBtn>
        {isOpenUserList ? (
            <PartyUserList
                isOpenUserList={isOpenUserList}
                chatUser={roomInfo?.responseChatUserList}
            />
        ) : null}
    </Wrapper>
);

export default ChatHeader;
