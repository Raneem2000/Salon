import { useMutation, useQuery } from "@tanstack/react-query";
import { PermissionApi } from "./PermissionApi";

const GetRolesContentsQuery = () => {
  const queryResult = useQuery({
    queryKey: ["get-permission"],
    queryFn: async () => {
      const data = await PermissionApi.GetRolesContents();
      return data;
    },
  });

  return queryResult;
};

const GetContentsByRoleIdQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-permission-by-id", id],
    queryFn: () => PermissionApi.GetContentsByRoleId(id),
    enabled: !!id,
  });
  return queryResult;
};

const SetPermissionQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-permission"],
    mutationFn: PermissionApi.SetCpPermission,
  });
  return queryResult;
};

export const PermissionQueries = {
  GetRolesContentsQuery,
  GetContentsByRoleIdQuery,
  SetPermissionQuery,
};
