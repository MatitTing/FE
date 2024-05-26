import { FC } from 'react';
import { ReviewDetailComponents as Components } from './components';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import ReviewDetailSection from './components/section/ReviewDetailInformation';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';

export interface ReviewDetailScreenProps {
    id: string;
}

const ReviewDetailScreen: FC<ReviewDetailScreenProps> = ({ id }) => (
    <Components.Layout>
        <DefaultHeader
            centerArea={<DefaultText text="상세 후기" size={17} />}
            leftArea={<HeaderBackButton />}
        />
        <Components.ContentsSection>
            <QuerySuspenseErrorBoundary>
                <ReviewDetailSection id={id} />
            </QuerySuspenseErrorBoundary>
        </Components.ContentsSection>
    </Components.Layout>
);

export default ReviewDetailScreen;
