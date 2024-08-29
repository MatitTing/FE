import styled from '@emotion/styled';
import { NewColor } from 'styles/Color';

const UserChat = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 10px 30px;
    max-width: 80%;
    min-height: 30px;
    border-radius: 25px;
    margin: 1rem 0;
    margin-left: 10px;
    padding-left: 30px;
    color: #fff;
    background-color: ${NewColor.primary};
`;

const MessageText = styled.p`
    width: 100%;
    margin: 0;
    line-height: 1.2;
    white-space: pre-line;
    word-wrap: break-word;
`;

interface UserMessageProps {
    message: string;
}

const UserMessage = ({ message }: UserMessageProps) => {
    return (
        <UserChat>
            <MessageText>{message}</MessageText>
        </UserChat>
    );
};

export default UserMessage;
