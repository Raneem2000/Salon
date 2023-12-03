import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { NotificationApi } from "./NotificationApi";
import { IPayload } from "../../interface/generic";

const SetNotificationCp = () => {
  const queryClient = useQueryClient();
  const queryResult = useMutation({
    mutationKey: ["set-notification-cp"],
    mutationFn: NotificationApi.SetNotificationCp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notification-all"] });
    },
  });
  return queryResult;
};

const DeleteNotificationCp = () => {
  const queryClient = useQueryClient();

  const queryResult = useMutation({
    mutationKey: ["delete-notification-cp"],
    mutationFn: NotificationApi.DeleteNotificationCp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notification-all"] });
    },
  });
  return queryResult;
};

const GetNotificationCp = (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-notification-all", params.Query, params.PageNumber],
    queryFn: async () => {
      const data = await NotificationApi.GetNotificationCp({
        PageNumber: params.PageNumber ?? 0,
        EnablePagination: params.EnablePagination ?? true,
        Query: params.Query,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
  return queryResult;
};

const GetNotificationByIdQuery = (id: string | undefined) => {
  const queryResult = useQuery({
    queryKey: ["get-notification-by-id", id],
    queryFn: async () => {
      const data = await NotificationApi.GetNotificationByIdCp(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};

export const NotificationQueries = {
  SetNotificationCp,
  DeleteNotificationCp,
  GetNotificationCp,
  GetNotificationByIdQuery,
};
