import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import {
  GetAllSalonType,
  GetSalonDetailsType,
  SalonData,
} from "./type";

const GetSalonAll = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IPagination<GetAllSalonType>>(
    API_Routes.Salon.GET_ALL_SALON_CP,
    {
      params: {
        EnablePagination: params.EnablePagination,
        Query: params.Query,
        PageNumber: params.PageNumber,
      },
    }
  );
  return data;
};

const GetSalonDetails = async (salonId: string) => {
  const { data } = await DeliveryApiInstances.get<GetSalonDetailsType>
  (API_Routes.Salon.GET_SALON_DETAILS_CP, {
    params: {
      salonId,
    },
  });
  return data;
};
const SetSalon = async (params: SalonData) => {
  const { data } = await DeliveryApiInstances.post(
    API_Routes.Salon.SET_SALON,
    params
  );
  return data;
};
const DeleteSalon = async (SalonId: string) => {
  const { data } = await DeliveryApiInstances.delete(
    API_Routes.Salon.DELETE_SALON,
    {
      params: {
        SalonId,
      },
    }
  );
  return data;
};
export const SalonApi = {
  GetSalonAll,
  GetSalonDetails,
  SetSalon,
  DeleteSalon
};
