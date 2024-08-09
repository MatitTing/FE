import styled from '@emotion/styled';
import router from 'next/router';
import Image from 'next/image';
import { ChatUserResponse } from 'types/chat/chatRooms';
import deletePartyUser from 'src/api/deleteChatUser';

interface PartyUserListProps {
    isOpenUserList: boolean;
    chatUser: ChatUserResponse;
}

const Wrapper = styled.div<{ isOpenUserList: boolean }>`
    position: absolute;
    top: 50px;
    left: 0;
    transform: ${(props) => (props.isOpenUserList ? 'translateX(0)' : 'translateX(-100%)')};
    z-index: 99999;
    width: 100%;
    height: calc(100vh - 50px);
    background-color: #fff;
`;

const Title = styled.h5`
    padding: 1rem 2rem;
    height: 50px;
`;

const List = styled.ul`
    padding: 0 2rem;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const ImageBox = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    background-color: skyblue;
`;

const NickName = styled.p``;

const Expulsion = styled.button``;

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
    background-color: #6c6c6c;
`;

const PartyUserList = ({ chatUser, isOpenUserList }: PartyUserListProps) => {
    const roomId = router.query.id;
    const handleClickUserExpulsion = (chatUserId: number) => {
        deletePartyUser({
            roomId: String(roomId),
            targetChatUserId: chatUserId,
        });
    };

    return (
        <Wrapper isOpenUserList={isOpenUserList}>
            <Title>내 정보</Title>
            <List>
                <UserInfo>
                    <ImageBox>
                        <Image
                            src={
                                chatUser?.chatUserInfo?.userProfileImg ||
                                '/images/profile/profile.png'
                            }
                            fill
                            style={{ objectFit: 'cover' }}
                            alt="프로필 이미지"
                        />
                    </ImageBox>
                    <Label>나</Label>
                    <NickName>{chatUser?.chatUserInfo?.nickname}</NickName>
                </UserInfo>
            </List>
            <hr />
            <Title>파티원 리스트 입니다.</Title>
            <List>
                {chatUser?.chatRoomUserDto.map(({ nickname, userProfileImg, role, chatUserId }) => (
                    <ListItem key={nickname}>
                        <UserInfo>
                            <ImageBox>
                                <Image
                                    src="/images/profile/profile.png"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    alt="프로필 이미지"
                                />
                            </ImageBox>
                            {role === 'HOST' && <Label>방장</Label>}
                            <NickName>{nickname}</NickName>
                        </UserInfo>
                        {chatUser.chatUserInfo.role === 'HOST' && role !== 'HOST' && (
                            <Expulsion onClick={() => handleClickUserExpulsion(chatUserId)}>
                                강퇴하기
                            </Expulsion>
                        )}
                    </ListItem>
                ))}
            </List>
        </Wrapper>
    );
};

export default PartyUserList;
