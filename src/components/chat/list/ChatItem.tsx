import styled from '@emotion/styled';
import router from 'next/router';
import { NewColor } from 'styles/Color';
import { ChatRoomList } from 'types/chat/chatRooms';
import ImageCard from '../ImageCard';
import RecentTime from '../RecentTime';

const Wrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-radius: 15px;
`;

const DetailBox = styled.div`
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
    font-size: 14px;
    max-width: 50vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
                <Wrapper key={roomId + index} onClick={() => router.push(`/chat/${roomId}`)}>
                    <ImageCard src={thumbnail} alt="대표 이미지" imageType="thumbnail" />
                    <DetailBox>
                        <TextBox>
                            <Title>{title}</Title>
                            <Message>{lastMessage}</Message>
                        </TextBox>
                        <RecentTime time={lastMessageTime} />
                    </DetailBox>
                </Wrapper>
            );
        })
    ) : (
        <NoList>{noListText}</NoList>
    );
};

export default ChatRoomItem;
