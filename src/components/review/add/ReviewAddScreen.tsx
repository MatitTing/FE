import { FC } from 'react';
import { ReviewAddComponents as Components } from './components';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import BackIcon from '@components/icons/common/Back.icon';
import ReviewAddStarRating from './components/ReviewAddStarRating';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import ReviewAddTextArea from './components/ReviewAddTextArea';
import ReviewAddImageInput from './components/ReviewAddImageInput';
import ReviewPostFooterButton from './components/ReviewPostFooterButton';

interface ReviewAddScreenProps {
    isEdit: boolean;
}

const ReviewAddScreen: FC<ReviewAddScreenProps> = ({ isEdit }) => (
    <Components.Layout>
        <DefaultHeader
            centerArea={
                <DefaultText text={isEdit ? '리뷰 수정' : '리뷰 작성'} size={15} weight={700} />
            }
            leftArea={<HeaderBackButton />}
        />
        <Components.ContentsSection>
            <ReviewAddStarRating />
            <ReviewAddTextArea />
            <ReviewAddImageInput />
        </Components.ContentsSection>
        <ReviewPostFooterButton isEdit={isEdit} />
    </Components.Layout>
);

export default ReviewAddScreen;
