import { useMutation, useQuery } from "@tanstack/react-query";
import { VersionApi } from "./VersionApi";

const GetVersionAllQuery = () => {
  const queryResult = useQuery({
    queryKey: ["get-all-Version"],
    queryFn: async () => {
      const data = await VersionApi.getVersion();
      return data;
    },
  });
  return queryResult;
};
const GetVersionDetailsQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-version-details", id],
    queryFn: async () => {
      const data = await VersionApi.GetVersionDetails(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};
const SetVersionQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-version"],
    mutationFn: VersionApi.SetVersion,
  });
  return queryResult;
};

const DeleteVersionQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-version"],
    mutationFn: VersionApi.DeleteVersion,
  });
  return queryResult;
};
export const VersionQueries = {
  SetVersionQuery,
  DeleteVersionQuery,
  GetVersionAllQuery,
  GetVersionDetailsQuery,
};
