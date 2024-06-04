import { PostFileResponse } from 'types/common/PostFileResponse';
import { postUploadImage } from './postUploadImage';

interface PostUploadFiles {
    fileList: File[];
}

const postUploadFiles = async ({ fileList }: PostUploadFiles): Promise<PostFileResponse[]> => {
    const promiseList = fileList.map((file) => postUploadImage(file));
    const result = await Promise.all(promiseList);
    return result;
};

export default postUploadFiles;
