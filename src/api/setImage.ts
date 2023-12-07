import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import defaultRequest from "src/lib/axios/defaultRequest";

interface SetImageResponse {
  imgUrl: string;
}

const setImage = async (image: File) =>
  await defaultRequest.post(
    "/api/party",
    { image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

const useSetImage = () =>
  useMutation<AxiosResponse<SetImageResponse>, AxiosError, File>({
    mutationFn: setImage,
  });

export default useSetImage;
