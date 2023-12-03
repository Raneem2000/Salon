import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { GetAllCountryType, GetCountryById, SetCountryType } from "./Type";

const getCpCountry = async (params: IPayload) => {
  // console.log(params.Query)
  const { data } = await DeliveryApiInstances.get<
    IPagination<GetAllCountryType>
  >(API_Routes.Country.GET_ALL_CP_Country, { params });
  return data;
};
// console.log(API_Routes.Country.GET_ALL_CP_Country)
const getCountryById = async (id: string | undefined) => {
  const { data } = await DeliveryApiInstances.get<GetCountryById>(
    API_Routes.Country.GET_Country_BY_ID,
    {
      params: {
        id,
      },
    }
  );
  return data;
};

const postCountry = async (data: SetCountryType) => {
  await DeliveryApiInstances.post(API_Routes.Country.SET_COUNTRY_CP, data);
};
const RemoveCountry = async (id: string) => {
  await DeliveryApiInstances.delete(API_Routes.Country.DELETe_CP_Country, {
    params: {
      id,
    },
  });
};
export const CountryApi = {
  getCpCountry,
  getCountryById,
  postCountry,
  RemoveCountry,
};