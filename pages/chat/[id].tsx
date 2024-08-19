import { GetServerSideProps } from 'next';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import ChatRoom from '@components/chat/room/ChatRoom';
import ProfileLoading from '@components/profile/ProfileLoading';
import ChatProvider from '@contexts/ChatProvider';

interface ChatRoomPageProps {
    roomId: number;
}

const ChatRoomPage = ({ roomId }: ChatRoomPageProps) => (
    <ChatProvider roomId={roomId}>
        <QuerySuspenseErrorBoundary suspenseFallback={<ProfileLoading />}>
            <ChatRoom />
        </QuerySuspenseErrorBoundary>
    </ChatProvider>
);

export default ChatRoomPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id: roomId } = params as { id: string };

    return {
        props: { roomId: Number(roomId) },
    };
};
