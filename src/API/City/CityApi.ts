import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import {
  getCityAllType,
  getCityByCountryType,
  getCityByIdType,
  setCityType,
} from "./type";

const GetAllCity = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IPagination<getCityAllType>>(
    API_Routes.City.GET_ALL_CP_City,
    {
      params: {
        ...params,
      },
    }
  );
  return data;
};
// console.log(API_Routes.City.GET_ALL_CP_City)
const GetAllCityAutoComplete = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IPagination<getCityAllType>>(
    API_Routes.City.GET_ALL_CP_City,
    {
      params: {
        ...params,
      },
    }
  );
  return data;
};

const getCityByCountry = async (params: getCityByCountryType) => {
  const { data } = await DeliveryApiInstances.get<IPagination<getCityAllType>>(
    API_Routes.City.CITY_GET_BY_COUNTRY,
    {
      params: {
        query: params.Query ?? "",
        pageNumber: params.PageNumber ?? 0,
        enablePagination: params.EnablePagination ?? true,
        CountryId: params.CountryId,
      },
    }
  );
  return data;
};

const getCityById = async (id: string | undefined) => {
  const { data } = await DeliveryApiInstances.get<getCityByIdType>(
    API_Routes.City.GET_CITY_BY_ID,
    {
      params: {
        id,
      },
    }
  );
  return data;
};

const SetCity = async (data: setCityType) => {
  await DeliveryApiInstances.post(API_Routes.City.SET_CITY_CP, data);
};
const DeleteCity = async (id: string) => {
  await DeliveryApiInstances.delete(API_Routes.City.DELETE_CITY_CP, {
    params: {
      id,
    },
  });
};
export const CityApi = {
  GetAllCity,
  GetAllCityAutoComplete,
  getCityByCountry,
  getCityById,
  SetCity,
  DeleteCity,
};
