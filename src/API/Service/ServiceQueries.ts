import { useMutation, useQuery } from "@tanstack/react-query";
import { ServiceApi } from "./ServiceApi";
import { ServicePayload } from "./type";

const GetServiceDetailsQuery = (params: ServicePayload) => {
  const queryResult = useQuery({
    queryKey: ["get-service", params.PageNumber, params.salonId, params.Query],
    queryFn: async () => {
      const data = await ServiceApi.GetServiceAll({
        PageNumber: params.PageNumber,
        Query: params.Query,
        EnablePagination: true,
        salonId: params.salonId,
      });
      return data;
    },
    select: (data) => data.services,
  });
  return queryResult;
};
const GetServiceDetailsAutoCompleteQuery = (salonId: string) => {
  const queryResult = useQuery({
    queryKey: ["get-service", salonId],
    queryFn: async () => {
      const data = await ServiceApi.GetServiceAll({
        EnablePagination: false,
        salonId: salonId,
      });
      return data;
    },
    enabled: !!salonId,
    select: (data) =>
      data.services.data.map((d) => {
        return {
          id: d.id,
          name: d.name.find((d) => d.key === "en")?.value!,
        };
      }),
  });
  return queryResult;
};

const SetServiceQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-service"],
    mutationFn: ServiceApi.SetService,
  });
  return queryResult;
};
const GetServDetailsQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-serv-details", id],
    queryFn: async () => {
      const data = await ServiceApi.GetServiceDetails(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};
const GetSalonByServIdDetailsQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-sealon-id-by-serv", id],
    queryFn: async () => {
      const data = await ServiceApi.GetSalonIdByServiceIdDetails(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};
export const ServiceQueries = {
  SetServiceQuery,
  GetServiceDetailsQuery,
  GetServDetailsQuery,
  GetServiceDetailsAutoCompleteQuery,
  GetSalonByServIdDetailsQuery
};
