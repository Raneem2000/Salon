import { useQuery } from "@tanstack/react-query";
import { BookingApi } from "./BookingApi";
import { IPayload } from "../../interface/generic";

const GetAllBookingQuery = (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-all-booking", params.PageNumber, params.Query],
    queryFn: async () => {
      const data = await BookingApi.GETALLBookingCp({
        EnablePagination: params.EnablePagination ?? true,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return data;
    },
  });
  return queryResult;
};

export const BookingQueries = {
  GetAllBookingQuery,
};
