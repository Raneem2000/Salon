import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import {
  GetAllCategoryType,
  GetCategoryByIdType,
  SetCategoryType,
} from "./type";

const GetAllCategory = async (payload: IPayload) => {
  const { data } = await DeliveryApiInstances.get<
    IPagination<GetAllCategoryType>
  >(API_Routes.Category.GET_ALL_CATEGORY_CP, {
    params: {
      ...payload,
    },
  });
  return data;
};
const getCategoryById = async (id: string | undefined) => {
  const { data } = await DeliveryApiInstances.get<GetCategoryByIdType>(
    API_Routes.Category.GET_CATEGORY_BY_ID_CP,
    {
      params: {
        id,
      },
    }
  );
  return data;
};
const setCategory = async (data: SetCategoryType) => {
  await DeliveryApiInstances.post(API_Routes.Category.SET_CATEGORY_CP, data);
};

const RemoveCategory = async (id: string) => {
  await DeliveryApiInstances.delete(API_Routes.Category.DELETE_CATEGORY_CP, {
    params: {
      id,
    },
  });
};

export const CategoryApi = {
  GetAllCategory,
  getCategoryById,
  setCategory,
  RemoveCategory,
};
