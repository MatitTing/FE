import { FC } from 'react';
import { ReviewMainComponents as Components } from './components';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import ReviewMainListSection from './components/section/ReviewMainListSection';

interface ReviewManiScreenProps {}

const ReviewManiScreen: FC<ReviewManiScreenProps> = () => (
    <Components.Layout>
        <DefaultHeader
            centerArea={<DefaultText text="000님의 후기" size={15} weight={700} />}
            leftArea={<HeaderBackButton />}
        />
        <Components.ContentsSection>
            <ReviewMainListSection />
        </Components.ContentsSection>
    </Components.Layout>
);

export default ReviewManiScreen;
