import styled from '@emotion/styled';
import { displayTime } from '../list/ChatRoomList';
import { ChatMessagesType } from 'types/chat/chat';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import Image from 'next/image';
import { MyInfo } from 'types/chat/chatRooms';
import { NewColor } from 'styles/Color';

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

const Wrapper = styled.li<{ isRight: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: ${({ isRight }) => (isRight ? 'row-reverse' : 'row')};
`;

const Chat = styled.div<{ isRight: boolean }>`
    display: flex;
    align-items: flex-start;
    margin: 1rem 0;
    padding: 10px 30px;
    max-width: 80%;
    min-height: 30px;
    width: max-content;
    border-radius: 25px;
    min-width: ${({ isRight }) => (isRight ? '0' : '30%')};
    padding-left: ${({ isRight }) => (isRight ? '30px' : '10px')};
    background-color: ${({ isRight }) => (isRight ? NewColor.primary : NewColor.LightBox)};

    svg {
        color: ${NewColor.LightBox};
    }
`;

const ImageBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 30px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
`;

const NickName = styled.p`
    font-size: 12px;
    margin-bottom: 2px;
    color: ${NewColor.text_secondary};
`;

const Message = styled.p<{ isRight: boolean }>`
    margin: 0;
    line-height: 1.2;
    white-space: pre-line;
    color: ${({ isRight }) => (isRight ? '#fff' : NewColor.text_primary)};
`;

const ReadMark = styled.div<{ isRight: boolean }>`
    margin-left: ${({ isRight }) => (isRight ? '0px' : '10px')};
    margin-right: ${({ isRight }) => (isRight ? '10px' : '0px')};
    margin-bottom: 10px;
    align-self: flex-end;
    color: rosybrown;
`;

const Notification = styled.div`
    margin: 1rem auto;
`;

interface MessageListProps {
    myInfo: MyInfo;
    messages: ChatMessagesType[];
    onObserve: VoidFunction;
    observerMinHeight: string;
}

const MessageList = ({ messages, onObserve, observerMinHeight, myInfo }: MessageListProps) => {
    return (
        <List>
            {messages.map(({ message, nickname, createAt, imgUrl, messageType }) => {
                const isUser = nickname === myInfo.nickname;

                return messageType === 'TALK' ? (
                    <Wrapper key={createAt} isRight={isUser}>
                        <Chat isRight={isUser}>
                            {isUser ? null : (
                                <ImageBox>
                                    <Image
                                        src={imgUrl || '/images/profile/profile.webp'}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        alt="프로필 이미지"
                                    />
                                </ImageBox>
                            )}
                            <div>
                                <div>
                                    {!isUser && <NickName>{nickname}</NickName>}
                                    <Message isRight={isUser}>{message}</Message>
                                </div>
                            </div>
                        </Chat>
                        <ReadMark isRight={isUser}>
                            {createAt ? displayTime(String(createAt)) : ''}
                        </ReadMark>
                    </Wrapper>
                ) : (
                    <Notification>{message}</Notification>
                );
            })}
            <ObserverTrigger onObserve={onObserve} observerMinHeight={observerMinHeight} />
        </List>
    );
};

export default MessageList;
