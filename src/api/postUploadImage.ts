import defaultRequest from 'src/lib/axios/defaultRequest';

export interface SetImageResponse {
    imgUrl: string;
}

export const postUploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await defaultRequest.post('/api/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};
