import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { SalonApi } from "./SalonApi";

const GetSalonAllQuery = (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-all-salon", params.PageNumber, params.Query],
    queryFn: async () => {
      const data = await SalonApi.GetSalonAll({
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
const GetSalonOption = () => {
  const queryResult = useQuery({
    queryKey: ["get-pp-salon"],
    queryFn: async () => {
      const data = await SalonApi.GetSalonAll({
        EnablePagination: false,
      });
      return data;
    },
    select: (data) =>
      data.data.map((d) => {
        return {
          id: d.id,
          name: d.name,
        };
      }),
  });
  return queryResult;
};
const GetSalonDetailsQuery = (salonId: string) => {
  const queryResult = useQuery({
    queryKey: ["get-salon-details", salonId],
    queryFn: async () => {
      const data = await SalonApi.GetSalonDetails(salonId);
      return data;
    },
    enabled: !!salonId,
  });
  return queryResult;
};
const SetSalonQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-salon"],
    mutationFn: SalonApi.SetSalon,
  });
  return queryResult;
};
export const SalonQueries = {
  GetSalonAllQuery,
  GetSalonDetailsQuery,
  SetSalonQuery,
  GetSalonOption
};
