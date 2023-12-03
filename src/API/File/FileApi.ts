import { API_Routes } from "../../Constants/ApiRoutes";
import DeliveryApiInstances from "../axios";
import { SetFileType } from "./type";

const SetFileApi = async (params: SetFileType) => {
  const { data } = await DeliveryApiInstances.post<string>(
    API_Routes.File.GET_FILE_CP,
    { File: params.File, FileType: params.FileType },
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
  return data;
};

const DeleteFile = async (url: string) => {
  const { data } = await DeliveryApiInstances.post<string>(
    API_Routes.File.DELETE_FILE_CP,
    { url },
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
  return data;
};
export const FileApi = {
  SetFileApi,
  DeleteFile,
};
