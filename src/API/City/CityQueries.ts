import { useMutation, useQuery } from "@tanstack/react-query";
import { INameAndId, IPayload } from "../../interface/generic";
import { CityApi } from "./CityApi";
import { getCityByCountryType } from "./type";

const GetAllCitiesQuery = (payload: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-city", payload.PageNumber, payload.Query],
    queryFn: async () => {
      const data = await CityApi.GetAllCity({
        PageNumber: payload.PageNumber,
        Query: payload.Query,
        EnablePagination: true,
      });
      return data;
    },
  });
  return queryResult;
};
const GetCityAutoCompleteQuery = () => {
  const queryResult = useQuery({
    queryKey: ["get-city-auto-complete"],
    queryFn: async () => {
      const data = await CityApi.GetAllCityAutoComplete({
        EnablePagination: false,
      });
      return data;
    },
    select: (data) =>
      data.data.map(
        (data) =>
          ({
            id: data.id,
            name: data.name,
          } as INameAndId)
      ),
  });
  return queryResult;
};

const GetCityByCountryQuery = (params: getCityByCountryType) => {
  const queryResult = useQuery({
    queryKey: [
      "get-city-by-country",
      params.Query,
      params.CountryId,
      params.PageNumber,
    ],
    queryFn: async () => {
      const data = await CityApi.getCityByCountry(params);
      return data;
    },
    enabled: params.enabled,
  });
  return queryResult;
};

const GetCityByIdQuery = (id: string | undefined) => {
  const queryResult = useQuery({
    queryKey: ["get-city-by-id", id],
    queryFn: () => CityApi.getCityById(id),
    enabled: !!id,
  });
  return queryResult;
};

const SetCity = () => {
  const queryResult = useMutation({
    mutationKey: ["post-city"],
    mutationFn: CityApi.SetCity,
  });
  return queryResult;
};

const DeleteCity = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-city"],
    mutationFn: CityApi.DeleteCity,
  });
  return queryResult;
};
export const CityQueries = {
  GetAllCitiesQuery,
  GetCityAutoCompleteQuery,
  GetCityByCountryQuery,
  GetCityByIdQuery,
  SetCity,
  DeleteCity,
};
