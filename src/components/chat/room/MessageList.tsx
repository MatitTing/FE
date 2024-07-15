import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { displayTime } from '../list/ChatRoomList';
import { ChatMessagesType } from 'types/chat/chat';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import Image from 'next/image';
import { MyInfo } from 'types/chat/chatRooms';

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

const ListItem = styled.li<{ userCheck: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.userCheck ? 'row-reverse' : 'row')};
    margin: 1rem 0;
`;

const ImageBox = styled.div<{ userCheck: boolean }>`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${(props) => (props.userCheck ? 0 : '10px')};
    margin-left: ${(props) => (props.userCheck ? '10px' : 0)};
`;

const MessageBox = styled.div<{ userCheck: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    min-width: 20%;
    background-color: ${(props) => (props.userCheck ? '#efebec' : '#efebec')};
    border-radius: 10px;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NickName = styled.p<{ userCheck: boolean }>`
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
`;

const Message = styled.p`
    margin: 0;
    color: '#000';
`;

const ReadMark = styled.div<{ userCheck: boolean }>`
    margin-left: ${(props) => (props.userCheck ? '0px' : '10px')};
    margin-right: ${(props) => (props.userCheck ? '10px' : '0px')};
    align-self: flex-end;
    color: rosybrown;
`;

const NotMessage = styled.div`
    margin: 2rem auto;
`;

interface MessageListProps {
    myInfo: MyInfo;
    messages: ChatMessagesType[];
    onObserve: VoidFunction;
    observerMinHeight: string;
}

const MessageList = ({ messages, onObserve, observerMinHeight, myInfo }: MessageListProps) => (
    <List>
        {messages.map(({ message, nickname, createAt, imgUrl }) => {
            return nickname ? (
                <ListItem key={createAt} userCheck={nickname === myInfo.nickname}>
                    <ImageBox userCheck={nickname === myInfo.nickname}>
                        <Image
                            src="/images/profile/profile.png"
                            fill
                            style={{ objectFit: 'cover' }}
                            alt=""
                        />
                    </ImageBox>
                    <MessageBox userCheck={nickname === myInfo.nickname}>
                        <TextBox>
                            <NickName userCheck={nickname === myInfo.nickname}>{nickname}</NickName>
                            <Message>{message}</Message>
                        </TextBox>
                    </MessageBox>
                    <ReadMark userCheck={nickname === myInfo.nickname}>
                        {createAt ? displayTime(String(createAt)) : ''}
                    </ReadMark>
                </ListItem>
            ) : (
                <NotMessage>{message}</NotMessage>
            );
        })}
        <ObserverTrigger onObserve={onObserve} observerMinHeight={observerMinHeight} />
    </List>
);

MessageList.getLayout = (page: ReactElement) => {
    return <>{page}</>;
};

export default MessageList;