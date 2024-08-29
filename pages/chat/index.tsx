import styled from '@emotion/styled';
import { NextPage } from 'next';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import ChatList from '@components/chat/list/ChatList';

const Wrapper = styled.div`
    margin: 0 auto;
    padding: 45px 0 75px 0;
    height: 100%;
    min-height: calc(100vh);
    max-width: 760px;
    min-width: 320px;
`;

const NotList = styled.div`
    text-align: center;
    padding: 10rem;
    font-size: 3vw;
`;

const ChatListPage: NextPage = () => (
    <Wrapper>
        <DefaultHeader centerArea={<DefaultText text="채팅방" size={17} weight={700} />} />
        <QuerySuspenseErrorBoundary
            errorFallback={() => <NotList>참여중인 방이 없습니다.</NotList>}
        >
            <ChatList />
        </QuerySuspenseErrorBoundary>
    </Wrapper>
);

export default ChatListPage;
