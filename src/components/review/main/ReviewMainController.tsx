import ReviewManiScreen from './ReviewMainScreen';

interface ReviewMainControllerProps {
    hostId: string;
}

const ReviewMainController = ({ hostId }: ReviewMainControllerProps) => {
    return <ReviewManiScreen hostId={hostId} />;
};

export default ReviewMainController;
