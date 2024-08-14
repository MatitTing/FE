import styled from '@emotion/styled';
import router, { Router } from 'next/router';
import Image from 'next/image';
import { ChatUserResponse } from 'types/chat/chatRooms';
import { NewColor } from 'styles/Color';

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

const Contents = styled.div`
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

const ImageBox = styled.div<{ isMage: boolean }>`
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border: 1px solid ${({ isMage }) => (isMage ? NewColor.border : NewColor.primary)};
`;

const NickName = styled.p``;

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
    background-color: #6c6c6c;
`;

interface PartyUserListProps {
    isOpenUserList: boolean;
    chatUser: ChatUserResponse;
    onClickUserExpulsion: (chatUserList: number) => void;
}

const PartyUserList = ({ chatUser, isOpenUserList, onClickUserExpulsion }: PartyUserListProps) => {
    const { userProfileImg, nickname, role: userRole } = chatUser.myInfo;

    return (
        <Wrapper isOpenUserList={isOpenUserList}>
            <Contents>
                <List>
                    <UserInfo>
                        <ImageBox isMage={!!userProfileImg}>
                            <Image
                                src={userProfileImg || '/images/profile/profile_fill.webp'}
                                fill
                                style={{ objectFit: 'cover' }}
                                alt="프로필 이미지"
                            />
                        </ImageBox>
                        <Label>나</Label>
                        <NickName>{nickname}</NickName>
                    </UserInfo>
                </List>

                <List>
                    {chatUser?.chatRoomUserDto.map(
                        ({ nickname, userProfileImg, role, chatUserId }) => (
                            <ListItem key={nickname}>
                                <UserInfo>
                                    <ImageBox isMage={!!userProfileImg}>
                                        <Image
                                            src={
                                                userProfileImg ||
                                                '/images/profile/profile_fill.webp'
                                            }
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            alt="프로필 이미지"
                                        />
                                    </ImageBox>
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
            </Contents>
        </Wrapper>
    );
};

export default PartyUserList;
