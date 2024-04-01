import { FC } from 'react';
import { ReviewAddComponents as Components } from './components';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import BackIcon from '@components/icons/common/Back.icon';

interface ReviewAddScreenProps {}

const ReviewAddScreen: FC<ReviewAddScreenProps> = () => (
    <Components.Layout>
        <DefaultHeader
            centerArea={<DefaultText text="리뷰 작성" size={15} weight={700} />}
            leftArea={
                <Components.IconWrapper>
                    <BackIcon />
                </Components.IconWrapper>
            }
        />
        <Components.ContentsSection>
            <div>sssss</div>
        </Components.ContentsSection>
    </Components.Layout>
);

export default ReviewAddScreen;
