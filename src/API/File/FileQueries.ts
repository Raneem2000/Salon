import { useMutation } from "@tanstack/react-query";
import { FileApi } from "./FileApi";

const SetFileQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-file"],
    mutationFn: FileApi.SetFileApi,
  });
  return queryResult;
};

const DeleteFileQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["delete-file"],
    mutationFn: FileApi.DeleteFile,
  });
  return queryResult;
};

export const FileQuery = {
  SetFileQuery,
  DeleteFileQuery,
};
