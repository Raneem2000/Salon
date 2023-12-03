import DeliveryApiInstances from "../axios";
import { API_Routes } from "../../Constants/ApiRoutes";
import { getAllFQA, setFQA } from "./type";

const GetAllFQA = async () => {
  const { data } = await DeliveryApiInstances.get<getAllFQA[]>(
    API_Routes.FQA.GET_ALL_FQA
  );
  return data;
};

const GetFQAById = async (id: string | undefined) => {
  const { data } = await DeliveryApiInstances.get<getAllFQA>(
    API_Routes.FQA.GET_FQA_BY_ID,
    {
      params: {
        id,
      },
    }
  );
  return data;
};

const SetFQA = async (params: setFQA) => {
  await DeliveryApiInstances.post(API_Routes.FQA.SET_FQA, {
    id: params.id ?? undefined,
    question: params.question,
    answer: params.answer,
  });
};

const DeleteFQA = async (id: string) => {
  await DeliveryApiInstances.delete(API_Routes.FQA.DELETE_FQA, {
    params: {
      id,
    },
  });
};

export const FQAApi = {
  GetAllFQA,
  GetFQAById,
  SetFQA,
  DeleteFQA,
};
