import { displayTime } from './ChatRoomList';
import styled from '@emotion/styled';
import Image from 'next/image';
import { ChatRoomList } from 'types/chat/chatRooms';

const Room = styled.li`
    display: flex;
    margin: 1rem 0;
    padding: 1rem 0;
`;

const ImageBox = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5%;
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
    margin: 0;
    font-size: 18px;
    font-weight: bold;
`;

const Message = styled.p`
    margin: 0;
`;

const Recentime = styled.p``;

const NoList = styled.div`
    text-align: center;
    padding: 10% 0;
`;

interface ChatRoomItemProps {
    list?: ChatRoomList[];
    onClickRouteRoom: (roomId: number) => Promise<boolean>;
    noListText: string;
}

const ChatRoomItem = ({ list, onClickRouteRoom, noListText }: ChatRoomItemProps) => {
    return list?.length ? (
        list?.map((item, index) => {
            const { roomId, title, lastMessageTime, lastMessage, thumbnail } = item;

            return (
                <Room key={roomId + index} onClick={() => onClickRouteRoom(roomId)}>
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
                        <Recentime>{lastMessageTime ? displayTime(lastMessageTime) : ''}</Recentime>
                    </RightBox>
                </Room>
            );
        })
    ) : (
        <NoList>{noListText}</NoList>
    );
};

export default ChatRoomItem;
