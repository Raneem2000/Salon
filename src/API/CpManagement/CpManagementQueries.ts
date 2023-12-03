import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { CpManagementApi } from "./CpManagementApi";
import { IPayload } from "../../interface/generic";

const LogInQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["login"],
    mutationFn: CpManagementApi.Login,
  });
  return queryResult;
};

const SetUserQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-user"],
    mutationFn: CpManagementApi.SetUser,
  });
  return queryResult;
};

const GetUsersQuery = (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-users", params.PageNumber, params.Query],
    queryFn: async () => {
      const data = await CpManagementApi.GetUsers({
        EnablePagination: true,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
  return queryResult;
};
const GetUserByIdQuery =  (userId: string) => {
  const queryResult = useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: async () => {
      const data = await CpManagementApi.GetUserById(userId);
      return data;
    },
    enabled:!!userId
  });
  return queryResult;
};
const GetRoles =  () => {
  const queryResult = useQuery({
    queryKey: ["get-roles"],
    queryFn: async () => {
      const data = await CpManagementApi.GetAllRoles();
      return data;
    },
  });
  return queryResult;
};

const useCpCustomersNames = (
  PhoneNumber?: number | null,
  UserName?: string
) => {
  const queryResult = useQuery({
    queryKey: ["get-customers-names-cp", UserName, PhoneNumber],
    queryFn: async () => {
      const data = await CpManagementApi.GetCustomerName(
        UserName ?? null,
        PhoneNumber
      );
      return data;
    },
  });
  return queryResult;
};

export const CpManagementQueries = {
  LogInQuery,
  SetUserQuery,
  GetUserByIdQuery,
  GetUsersQuery,
  GetRoles,
  useCpCustomersNames,
};
