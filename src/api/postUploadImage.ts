import defaultRequest from "src/lib/axios/defaultRequest";

export interface SetImageResponse {
  imgUrl: string;
}

export const postUploadImage = async (image: File) =>
  (
    await defaultRequest.post(
      "/api/image",
      { image },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  ).data;
