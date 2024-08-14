import { displayTime } from './ChatRoomList';
import styled from '@emotion/styled';
import Image from 'next/image';
import router from 'next/router';
import { NewColor } from 'styles/Color';
import { ChatRoomList } from 'types/chat/chatRooms';

const Room = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 15px;
`;

const ImageBox = styled.div`
    position: relative;
    margin-right: 10px;
    width: 10%;
    aspect-ratio: 1/1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border: 1px solid ${NewColor.border};
`;

const RightBox = styled.div`
    width: calc(100% - 60px);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.p`
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: bold;
`;

const Message = styled.p`
    margin: 0;
    color: ${NewColor.text_secondary};
    font-size: 18px;
`;

const RecenTime = styled.p`
    font-size: 12px;
`;

const NoList = styled.div`
    text-align: center;
    padding: 10% 0;
`;

interface ChatRoomItemProps {
    list?: ChatRoomList[];
    noListText: string;
}

const ChatRoomItem = ({ list, noListText }: ChatRoomItemProps) => {
    return list?.length ? (
        list?.map((item, index) => {
            const { roomId, title, lastMessageTime, lastMessage, thumbnail } = item;

            return (
                <Room key={roomId + index} onClick={() => router.push(`/chat/${roomId}`)}>
                    <ImageBox>
                        <Image
                            fill
                            src={thumbnail}
                            alt="thumbnail"
                            style={{ objectFit: 'cover' }}
                        />
                    </ImageBox>
                    <RightBox>
                        <TextBox>
                            <Title>{title}</Title>
                            <Message>{lastMessage}</Message>
                        </TextBox>
                        <RecenTime>{lastMessageTime ? displayTime(lastMessageTime) : ''}</RecenTime>
                    </RightBox>
                </Room>
            );
        })
    ) : (
        <NoList>{noListText}</NoList>
    );
};

export default ChatRoomItem;
