import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChatMessagesType } from 'types/chat/chat';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import { NewColor } from 'styles/Color';
import ImageCard from '../ImageCard';
import RecentTime from '../RecentTime';

const List = styled.ul`
    padding: 0 2rem;
    margin: 0 auto;
    list-style: none;
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
`;

const Wrapper = styled.li<{ isRight: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: ${({ isRight }) => (isRight ? 'row-reverse' : 'row')};

    > div {
        ${({ isRight }) => (isRight ? UserMessageStyle : PartyMessageStyle)};
    }
`;

const Chat = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 1rem 0;
    padding: 10px 30px;
    max-width: 80%;
    min-height: 30px;
    width: max-content;
    border-radius: 25px;

    svg {
        color: ${NewColor.LightBox};
    }
`;

const NickName = styled.p`
    font-size: 12px;
    margin-bottom: 2px;
    color: ${NewColor.text_primary};
`;

const MessageText = styled.p`
    margin: 0;
    line-height: 1.2;
    white-space: pre-line;
`;

const Notification = styled.div`
    margin: 1rem auto;
`;

const UserMessageStyle = css`
    margin-left: 10px;
    padding-left: 30px;
    color: #fff;
    background-color: ${NewColor.primary};
`;

const PartyMessageStyle = css`
    margin-right: 10px;
    min-width: 30%;
    padding-left: 10px;
    color: ${NewColor.text_secondary};
    background-color: ${NewColor.LightBox};
`;

interface MessageListProps {
    userNickname: string;
    messages: ChatMessagesType[];
    onObserve: VoidFunction;
    observerMinHeight: string;
}

const ChatMessage = ({
    messages,
    onObserve,
    observerMinHeight,
    userNickname,
}: MessageListProps) => {
    return (
        <List>
            {messages.map(({ message, nickname, createAt, imgUrl, messageType }, index) => {
                const isUser = nickname === userNickname;

                return messageType === 'TALK' ? (
                    <Wrapper isRight={isUser} key={`${index}: ${message}}`}>
                        <Chat>
                            {isUser ? null : (
                                <ImageCard
                                    imageType="chatProfile"
                                    src={imgUrl}
                                    alt="프로필 이미지"
                                />
                            )}
                            <div>
                                {isUser ? null : <NickName>{nickname}</NickName>}
                                <MessageText>{message}</MessageText>
                            </div>
                        </Chat>
                        <RecentTime time={createAt} />
                    </Wrapper>
                ) : (
                    <Notification key={`${index}: ${message}}`}>{message}</Notification>
                );
            })}
            <ObserverTrigger onObserve={onObserve} observerMinHeight={observerMinHeight} />
        </List>
    );
};

export default ChatMessage;
