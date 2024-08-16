import styled from '@emotion/styled';
import { ChatUserResponse } from 'types/chat/chatRooms';
import { NewColor } from 'styles/Color';
import ImageCard from '../ImageCard';

const Wrapper = styled.div<{ isOpenUserList: boolean }>`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(000, 000, 000, 0.65);
    z-index: 99;
    color: ${NewColor.text_primary};
    transition: opacity 0.3s;
    opacity: ${({ isOpenUserList }) => (isOpenUserList ? 1 : 0)};
    pointer-events: none;

    > div {
        transition: transform 0.3s;
        transform: translateY(${({ isOpenUserList }) => (isOpenUserList ? '0' : '100%')});
    }
`;

const ListContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding: 1rem;
    padding-top: 30px;
    width: 100%;
    height: 85%;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    background-color: #fff;
    overflow: hidden;
    pointer-events: all;
`;

const List = styled.ul`
    padding: 0 2rem;
    margin-bottom: 40px;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const NickName = styled.p`
    font-size: 14px;
    font-weight: 500;
`;

const Expulsion = styled.button`
    padding: 5px 20px;
    color: #fff;
    border-radius: 15px;
    background-color: ${NewColor.primary};
`;

const Label = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 8px;
    font-weight: bold;
    color: #fff;
    background-color: ${NewColor.primary};
`;

interface ChatUserListProps {
    isOpenUserList: boolean;
    chatUser: ChatUserResponse;
    onClickUserExpulsion: (chatUserList: number) => void;
}

const ChatUserList = ({ chatUser, isOpenUserList, onClickUserExpulsion }: ChatUserListProps) => {
    const { userProfileImg, nickname, role: userRole } = chatUser.myInfo;

    return (
        <Wrapper isOpenUserList={isOpenUserList}>
            <ListContainer>
                <List>
                    <UserInfo>
                        <ImageCard
                            src={userProfileImg}
                            alt="프로필 이미지"
                            imageType="chatUserListprofile"
                        />
                        <Label>나</Label>
                        <NickName>{nickname}</NickName>
                    </UserInfo>
                </List>

                <List>
                    {chatUser?.chatRoomUserDto.map(
                        ({ nickname, userProfileImg, role, chatUserId }) => (
                            <ListItem key={nickname}>
                                <UserInfo>
                                    <ImageCard
                                        src={userProfileImg}
                                        alt="프로필 이미지"
                                        imageType="chatUserListprofile"
                                    />
                                    {role === 'HOST' && <Label>방장</Label>}
                                    <NickName>{nickname}</NickName>
                                </UserInfo>
                                {userRole === 'HOST' && role !== 'HOST' && (
                                    <Expulsion onClick={() => onClickUserExpulsion(chatUserId)}>
                                        강퇴
                                    </Expulsion>
                                )}
                            </ListItem>
                        ),
                    )}
                </List>
            </ListContainer>
        </Wrapper>
    );
};

export default ChatUserList;
