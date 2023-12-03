import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { IFeedBackGet } from "./type";

const getFeedBack = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IPagination<IFeedBackGet>>(
    API_Routes.Feedback.GET_FEEDBACK_CP,
    {
      params
    }
  );
  return data;
};

export const FeedbackApi = {
  getFeedBack,
};
