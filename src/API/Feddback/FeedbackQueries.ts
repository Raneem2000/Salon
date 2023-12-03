import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { FeedbackApi } from "./FeedbackApi";

const FeedBackQuery = (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-feed", params.PageNumber, params.Query],
    queryFn: async () => {
      const data = await FeedbackApi.getFeedBack({
        EnablePagination: true,
        Query: params.Query,
        PageNumber: params.PageNumber,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
  return queryResult;
};
export const FeedbackQueries = {
  FeedBackQuery,
};
