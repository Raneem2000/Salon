import { API_Routes } from "../../Constants/ApiRoutes";
import DeliveryApiInstances from "../axios";
import { IPaginationService, ServiceData, ServicePayload } from "./type";

const GetServiceAll = async (params: ServicePayload) => {
  const { data } = await DeliveryApiInstances.get<IPaginationService>(
    API_Routes.Salon.GET_SALON_DETAILS_CP,
    {
      params: {
        EnablePagination: params.EnablePagination,
        Query: params.Query,
        PageNumber: params.PageNumber,
        salonId: params.salonId,
      },
    }
  );
  return data;
};
const SetService = async (params: ServiceData) => {
  await DeliveryApiInstances.post(API_Routes.Service.SET_SERVICE_CP, params);
};
const DeleteService = async (ServiceId: string) => {
  const { data } = await DeliveryApiInstances.delete(
    API_Routes.Service.DELETE_SERVICE,
    {
      params: {
        ServiceId,
      },
    }
  );
  return data;
};
const GetServiceDetails = async (serviceId: string) => {
  const { data } = await DeliveryApiInstances.get<ServiceData>(
    API_Routes.Service.GET_BY_ID,
    {
      params: {
        serviceId,
      },
    }
  );
  return data;
};
const GetSalonIdByServiceIdDetails = async (serviceId: string) => {
  const { data } = await DeliveryApiInstances.get<string>
  (API_Routes.Service.GET_SalonID_ByService, {
    params: {
      serviceId,
    },
  });
  return data;
};
export const ServiceApi = {
  SetService,
  GetServiceAll,
  DeleteService,
  GetServiceDetails,
  GetSalonIdByServiceIdDetails
};
