import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { getNotificationCpType, setNotificationCpType } from "./type";

const SetNotificationCp = async (params: setNotificationCpType) => {
  const { data } = await DeliveryApiInstances.post(
    API_Routes.Notifications.SET_NOTIFICATION_CP,
    params
  );
  return data;
};

const DeleteNotificationCp = async (Id: string) => {
  const { data } = await DeliveryApiInstances.delete(
    API_Routes.Notifications.DELETE_NOTIFICATION_CP,
    {
      params: {
        Id,
      },
    }
  );
  return data;
};

const GetNotificationCp = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<
    IPagination<getNotificationCpType>
  >(API_Routes.Notifications.GET_ALL_NOTIFICATION_CP, {
    params: {
      ...params,
    },
  });
  return data;
};

const GetNotificationByIdCp = async (id: string | undefined) => {
  const { data } = await DeliveryApiInstances.get<getNotificationCpType>(
    API_Routes.Notifications.GET_NOTIFICATION_BY_ID,
    {
      params: {
        id,
      },
    }
  );
  return data;
};

export const NotificationApi = {
  SetNotificationCp,
  DeleteNotificationCp,
  GetNotificationCp,
  GetNotificationByIdCp
};
