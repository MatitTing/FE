import { MouseEventHandler } from 'react';
import PartyUserList from './PartyUserList';
import styled from '@emotion/styled';
import { ChatRoomInfoResponse } from 'types/chat/chatRooms';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import { DefaultHeader } from '@components/common/DefaultHeader';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
    background-color: #ddd;
`;

const MenuBtn = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
`;

const ChatHeader = ({ roomInfo, isOpenUserList, handleOpenUserList }: ChatHeaderProps) => {
    const menu = (
        <MenuBtn onClick={handleOpenUserList}>
            {isOpenUserList ? <CloseIcon /> : <MenuIcon />}
        </MenuBtn>
    );

    return (
        <Wrapper>
            <DefaultHeader
                centerArea={roomInfo?.chatRoomInfoRes.title}
                leftArea={<HeaderBackButton />}
                rightArea={menu}
            />
            <PartyUserList
                isOpenUserList={isOpenUserList}
                chatUser={roomInfo?.responseChatUserList}
            />
        </Wrapper>
    );
};

export default ChatHeader;
