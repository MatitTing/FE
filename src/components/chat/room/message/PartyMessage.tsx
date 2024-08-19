import ImageCard from '@components/chat/ImageCard';
import styled from '@emotion/styled';
import { NewColor } from 'styles/Color';

const PartyChat = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 1rem 0;
    margin-right: 10px;
    padding: 10px 30px;
    padding-left: 10px;
    min-width: 30%;
    max-width: 80%;
    min-height: 30px;
    border-radius: 25px;
    color: ${NewColor.text_secondary};
    background-color: ${NewColor.LightBox};

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
    word-wrap: break-word;
`;

interface PartyMessageProps {
    imgUrl: string;
    nickname: string;
    message: string;
}

const PartyMessage = ({ imgUrl, nickname, message }: PartyMessageProps) => (
    <PartyChat>
        <ImageCard imageType="chatProfile" src={imgUrl} alt="프로필 이미지" />

        <div>
            <NickName>{nickname}</NickName>
            <MessageText>{message}</MessageText>
        </div>
    </PartyChat>
);

export default PartyMessage;
