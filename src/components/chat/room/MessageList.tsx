import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { displayTime } from '../list/ChatRoomList';
import { ChatMessagesType } from 'types/chat/chat';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import Image from 'next/image';
import { ChatUserInfo } from 'types/chat/chatRooms';

const List = styled.ul`
    padding: 0 2rem;
    margin: 0 auto;
    list-style: none;
    width: 100%;
    height: calc(100vh - 119px);
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
`;

const ListItem = styled.li<{ isChecked: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.isChecked ? 'row-reverse' : 'row')};
    margin: 1rem 0;
`;

const ImageBox = styled.div<{ isChecked: boolean }>`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${(props) => (props.isChecked ? 0 : '10px')};
    margin-left: ${(props) => (props.isChecked ? '10px' : 0)};
`;

const MessageBox = styled.div<{ isChecked: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    min-width: 20%;
    background-color: ${(props) => (props.isChecked ? '#efebec' : '#efebec')};
    border-radius: 10px;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NickName = styled.p<{ isChecked: boolean }>`
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
`;

const Message = styled.p`
    margin: 0;
    color: '#000';
`;

const ReadMark = styled.div<{ isChecked: boolean }>`
    margin-left: ${(props) => (props.isChecked ? '0px' : '10px')};
    margin-right: ${(props) => (props.isChecked ? '10px' : '0px')};
    align-self: flex-end;
    color: rosybrown;
`;

const Notification = styled.div`
    margin: 1rem auto;
`;

interface MessageListProps {
    chatUserInfo: ChatUserInfo;
    messages: ChatMessagesType[];
    onObserve: VoidFunction;
    observerMinHeight: string;
}

const MessageList = ({
    messages,
    onObserve,
    observerMinHeight,
    chatUserInfo,
}: MessageListProps) => (
    <List>
        {messages.map(({ message, nickname, createAt, imgUrl, messageType }) => {
            return messageType === 'TALK' ? (
                <ListItem key={createAt} isChecked={nickname === chatUserInfo.nickname}>
                    <ImageBox isChecked={nickname === chatUserInfo.nickname}>
                        <Image
                            src="/images/profile/profile.png"
                            fill
                            style={{ objectFit: 'cover' }}
                            alt="프로필 이미지"
                        />
                    </ImageBox>
                    <MessageBox isChecked={nickname === chatUserInfo.nickname}>
                        <TextBox>
                            <NickName isChecked={nickname === chatUserInfo.nickname}>
                                {nickname}
                            </NickName>
                            <Message>{message}</Message>
                        </TextBox>
                    </MessageBox>
                    <ReadMark isChecked={nickname === chatUserInfo.nickname}>
                        {createAt ? displayTime(String(createAt)) : ''}
                    </ReadMark>
                </ListItem>
            ) : (
                <Notification>{message}</Notification>
            );
        })}
        <ObserverTrigger onObserve={onObserve} observerMinHeight={observerMinHeight} />
    </List>
);

export default MessageList;
