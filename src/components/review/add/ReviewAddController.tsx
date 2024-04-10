import { FC, useCallback } from 'react';
import ReviewAddScreen from './ReviewAddScreen';
import { FormProvider, useForm } from 'react-hook-form';
import { ImageInputValue } from '@components/common/imageInput/ImageInput';

interface ReviewAddControllerProps {
    isEdit?: boolean;
}

export interface ReviewFormValue {
    rating: number;
    reviewComment: string;
    reviewPhotos?: ImageInputValue[];
}

const ReviewAddController: FC<ReviewAddControllerProps> = ({ isEdit = false }) => {
    const form = useForm<ReviewFormValue>({
        defaultValues: {
            rating: 5,
            reviewComment: '',
            reviewPhotos: [],
        },
    });

    const onValid = useCallback(({ rating, reviewComment, reviewPhotos }: ReviewFormValue) => {
        console.log(reviewComment, rating, reviewPhotos);
    }, []);

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onValid)}>
                <ReviewAddScreen isEdit />
            </form>
        </FormProvider>
    );
};

export default ReviewAddController;
