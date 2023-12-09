import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import defaultRequest from "src/lib/axios/defaultRequest";

interface SetImageResponse {
  imgUrl: string;
}

const setImage = async (image: File) =>
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

const useSetImage = () =>
  useMutation<SetImageResponse, AxiosError, File>({
    mutationFn: setImage,
  });

export default useSetImage;
