import { FC } from 'react';
import { ReviewDetailComponents as Components } from './components';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import ReviewDetailSection from './components/section/ReviewDetailInformation';

interface ReviewDetailScreenProps {}

const ReviewDetailScreen: FC<ReviewDetailScreenProps> = () => (
    <Components.Layout>
        <DefaultHeader
            centerArea={<DefaultText text="상세 후기" size={17} />}
            leftArea={<HeaderBackButton />}
        />
        <Components.ContentsSection>
            <ReviewDetailSection/>
        </Components.ContentsSection>
    </Components.Layout>
);

export default ReviewDetailScreen;
