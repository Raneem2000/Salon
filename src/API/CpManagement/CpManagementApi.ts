import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import {
  GetCustomersNamesCpType,
  GetLogInType,
  GetRoles,
  GetUsersType,
  SetLogInType,
  SetUserType,
} from "./type";

const Login = async (payload: SetLogInType) => {
  const { data } = await DeliveryApiInstances.post<GetLogInType>(
    API_Routes.CpManagement.LOGIN_CP,
    payload
  );
  return data;
};
const SetUser = async (params: SetUserType) => {
  const { data } = await DeliveryApiInstances.post(
    API_Routes.CpManagement.SET_USER_CP,
    params
  );
  return data;
};
const GetUsers = async (payload: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IPagination<GetUsersType>>(
    API_Routes.CpManagement.GET_USERS_CP,
    {
      params: {
        ...payload,
      },
    }
  );
  return data;
};
const GetUserById = async (userId: string) => {
  const { data } = await DeliveryApiInstances.get<GetUsersType>(
    API_Routes.CpManagement.GET_USER_BY_ID_CP,
    {
      params: {
        userId,
      },
    }
  );
  return data;
};
const DeleteUser = async (UserId: string) => {
  const { data } = await DeliveryApiInstances.delete(
    API_Routes.CpManagement.DELETE_USER_CP,
    {
      params: {
        UserId,
      },
    }
  );
  return data;
};
const GetAllRoles = async () => {
  const { data } = await DeliveryApiInstances.get<GetRoles[]>(
    API_Routes.CpManagement.GET_ROLES_CP
  );
  return data;
};

const GetCustomerName = async (
  UserName: string | null,
  PhoneNumber?: number | null
) => {
  const { data } = await DeliveryApiInstances.get<GetCustomersNamesCpType[]>(
    API_Routes.CpManagement.GET_CUSTOMERS_NAMES_CP,
    {
      params: {
        UserName: UserName,
        PhoneNumber: PhoneNumber,
      },
    }
  );
  return data;
};

export const CpManagementApi = {
  Login,
  SetUser,
  GetUsers,
  GetUserById,
  DeleteUser,
  GetAllRoles,
  GetCustomerName,
};
