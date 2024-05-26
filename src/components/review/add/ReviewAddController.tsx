import { FC, useCallback } from 'react';
import ReviewAddScreen from './ReviewAddScreen';
import { FormProvider, useForm } from 'react-hook-form';
import { ImageInputValue } from '@components/common/imageInput/ImageInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import postReview from 'src/api/postReview';
import patchReview from 'src/api/patchReview';
import { postUploadImage } from 'src/api/postUploadImage';
import { useRouter } from 'next/router';
import postUploadFiles from 'src/api/postUploadFiles';
import useToast from '@hooks/useToast';
import { API_GET_REVIEW_LIST_KEY } from 'src/api/getReviewList';
import { API_GET_PARTY_STATUS_KEY } from 'src/api/getPartyCurrentSituation';
import getReviewDetail, { API_GET_REVIEW_DETAIL } from 'src/api/getReviewDetail';
import { isAxiosError } from 'axios';

interface ReviewAddControllerProps {
    isEdit?: boolean;
}

export interface ReviewFormValue {
    rating: number;
    reviewComment: string;
    reviewPhotos?: ImageInputValue[];
}

const separateImages = (images: ImageInputValue[]) =>
    images.reduce<{
        newImages: File[];
        originalImages: string[];
    }>(
        (acc, cur) => {
            if (typeof cur.src !== 'string') {
                acc.newImages.push(cur.src);
            } else {
                acc.originalImages.push(cur.src);
            }
            return acc;
        },
        { newImages: [], originalImages: [] },
    );

const ReviewAddController: FC<ReviewAddControllerProps> = ({ isEdit = false }) => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const { query, back } = useRouter();
    const partyId = query.partyId;
    const reviewId = query.id;
    const reviewData = useQuery({
        queryKey: [API_GET_REVIEW_DETAIL],
        queryFn: () => getReviewDetail({ reviewId: String(reviewId) }),
        enabled: isEdit && !!reviewId,
    });

    const reviewPostMutation = useMutation({
        mutationFn: postReview,
    });
    const reviewPatchMutation = useMutation({
        mutationFn: patchReview,
    });
    const imageUploadMutation = useMutation({
        mutationFn: postUploadFiles,
    });
    const form = useForm<ReviewFormValue>({
        defaultValues: {
            rating: reviewData.data?.rating ?? 5,
            reviewComment: reviewData.data?.content ?? '',
            reviewPhotos: reviewData.data?.reviewImg.map((url) => ({ src: url })) ?? [],
        },
    });

    const onValid = useCallback(
        async ({ rating, reviewComment, reviewPhotos }: ReviewFormValue) => {
            const { newImages, originalImages } = separateImages(reviewPhotos ?? []);
            const payload = {
                rating,
                content: reviewComment,
                imgUrl: originalImages,
                partyId: Number(partyId),
                reviewId: Number(reviewId),
            };
            if (reviewPhotos && reviewPhotos.length > 0) {
                const uploadImages = await imageUploadMutation.mutateAsync({ fileList: newImages });
                payload.imgUrl = [...originalImages, ...uploadImages.map(({ imgUrl }) => imgUrl)];
            }

            if (isEdit) {
                reviewPatchMutation.mutate(
                    {
                        ...payload,
                        reviewId: Number(reviewId),
                    },
                    {
                        onSuccess: async () => {
                            await queryClient.invalidateQueries({
                                queryKey: [API_GET_REVIEW_LIST_KEY],
                            });
                            await queryClient.invalidateQueries({
                                queryKey: [API_GET_REVIEW_DETAIL],
                            });
                            await queryClient.invalidateQueries({
                                queryKey: [API_GET_PARTY_STATUS_KEY],
                            });
                            await showToast('리뷰 수정 완료');
                            back();
                        },
                        onError: (error) => {
                            if (isAxiosError(error)) {
                                showToast(error.response?.data.errorMessage);
                                return;
                            }
                            showToast('리뷰 수정 실패');
                        },
                    },
                );
                return;
            }
            reviewPostMutation.mutate(payload, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: [API_GET_REVIEW_LIST_KEY],
                    });
                    await queryClient.invalidateQueries({
                        queryKey: [API_GET_REVIEW_DETAIL],
                    });
                    await queryClient.invalidateQueries({
                        queryKey: [API_GET_PARTY_STATUS_KEY],
                    });
                    await showToast('리뷰 작성 완료');
                    back();
                },
                onError: (error) => {
                    if (isAxiosError(error)) {
                        showToast(error.response?.data.errorMessage);
                        return;
                    }
                    showToast('리뷰 작성 실패');
                },
            });
        },
        [
            back,
            imageUploadMutation,
            isEdit,
            partyId,
            queryClient,
            reviewId,
            reviewPatchMutation,
            reviewPostMutation,
            showToast,
        ],
    );

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onValid)}>
                <ReviewAddScreen isEdit={isEdit} />
            </form>
        </FormProvider>
    );
};

export default ReviewAddController;
