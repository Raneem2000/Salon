import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { GetAllBookingType } from "./type";

const GETALLBookingCp = async (params: IPayload) => {
    const {data} = await DeliveryApiInstances.get<IPagination<GetAllBookingType>>
    (API_Routes.Booking.GET_ALL_Booking_CP , {params});
    return data;
};

export const BookingApi = {
    GETALLBookingCp,
}