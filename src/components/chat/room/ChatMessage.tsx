import styled from '@emotion/styled';
import { ChatMessagesType } from 'types/chat/chat';
import RecentTime from '../RecentTime';
import UserMessage from './message/UserMessage';
import PartyMessage from './message/PartyMessage';

const Wrapper = styled.li<{ direction: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: ${({ direction }) => (direction ? 'row-reverse' : 'row')};
`;

const Notification = styled.div`
    margin: 1rem auto;
`;

interface MessageListProps {
    userName: string;
    messages: ChatMessagesType[];
}

const ChatMessage = ({ messages, userName }: MessageListProps) => {
    return messages.map(({ message, nickname, createAt, imgUrl, messageType: type }, index) => {
        const isUser = nickname === userName;

        return type === 'TALK' ? (
            <Wrapper direction={isUser} key={`${index}: ${message}}`}>
                {isUser ? (
                    <UserMessage message={message} />
                ) : (
                    <PartyMessage message={message} nickname={nickname} imgUrl={imgUrl} />
                )}
                <RecentTime time={createAt} />
            </Wrapper>
        ) : (
            <Notification key={`${index}: ${message}}`}>{message}</Notification>
        );
    });
};

export default ChatMessage;
