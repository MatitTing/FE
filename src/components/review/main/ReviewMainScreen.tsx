import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import { ReviewMainComponents as Components } from './components';
import ReviewMainListSection from './components/section/ReviewMainListSection';

interface ReviewMainScreenProps {
    hostId: string;
}

const ReviewMainScreen = ({ hostId }: ReviewMainScreenProps) => (
    <Components.Layout>
        <DefaultHeader
            centerArea={<DefaultText text="000님의 후기" size={15} weight={700} />}
            leftArea={<HeaderBackButton />}
        />
        <Components.ContentsSection>
            <QuerySuspenseErrorBoundary>
                <ReviewMainListSection hostId={hostId} />
            </QuerySuspenseErrorBoundary>
        </Components.ContentsSection>
    </Components.Layout>
);

export default ReviewMainScreen;
