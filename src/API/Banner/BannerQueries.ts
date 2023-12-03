import { useMutation, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { BannerAPI } from "./BannerApi";

const GetAllBannerQuery = (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-all-banner", params.Query, params.PageNumber],
    queryFn: async () => {
      const data = await BannerAPI.GetAllBanner({
        EnablePagination: true,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return data;
    },
  });
  return queryResult;
};

const GetBannerByIdQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-banner-by-id", id],
    queryFn: async () => {
      const data = await BannerAPI.GetBannerById(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};

const SetBannerQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-banner"],
    mutationFn: BannerAPI.SetBanner,
  });
  return queryResult;
};

const DeleteBannerQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: BannerAPI.DeleteBanner,
  });
  return queryResult;
};

export const BannerQuery = {
  GetAllBannerQuery,
  GetBannerByIdQuery,
  SetBannerQuery,
  DeleteBannerQuery,
};
