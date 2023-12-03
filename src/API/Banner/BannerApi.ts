import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { GetAllBannerCpType, GetBannerByIdType, SetBannerTypeData } from "./type";

const GetAllBanner = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<
    IPagination<GetAllBannerCpType>
  >(API_Routes.Banner.GET_ALL_BANNER_CP, {
    params: {
      ...params,
    },
  });
  return data;
};

const GetBannerById = async (id: string) => {
  const { data } = await DeliveryApiInstances.get<GetBannerByIdType>(
    API_Routes.Banner.GET_BANNER_BY_ID_CP,
    {
      params: {
        id,
      },
    }
  );
  return data;
};

const SetBanner = async (params: SetBannerTypeData) => {
  await DeliveryApiInstances.post(API_Routes.Banner.SET_BANNER_CP, params);
};

const DeleteBanner = async (id: string) => {
  await DeliveryApiInstances.delete(API_Routes.Banner.DELETE_BANNER_CP, {
    params: {
      id,
    },
  });
};

export const BannerAPI = {
  GetAllBanner,
  GetBannerById,
  SetBanner,
  DeleteBanner,
};
