import { API_Routes } from "../../Constants/ApiRoutes";
import DeliveryApiInstances from "../axios";
import { VersionData } from "./type";

const getVersion = async () => {
  const { data } = await DeliveryApiInstances.get<VersionData[]>(
    API_Routes.Version.GET_VERSION
  );
  return data;
};
const SetVersion = async (params: VersionData) => {
  await DeliveryApiInstances.post(API_Routes.Version.SET_VERSION_CP, params);
};

const DeleteVersion = async (id: string) => {
  await DeliveryApiInstances.delete(API_Routes.Version.DELETE_VERSION_CP, {
    params: {
      id,
    },
  });
};
const GetVersionDetails = async (id: string) => {
  const { data } = await DeliveryApiInstances.get<VersionData>(
    API_Routes.Version.GET_Version_BY_Id,
    {
      params: {
        id,
      },
    }
  );
  return data;
};
export const VersionApi = {
  SetVersion,
  DeleteVersion,
  GetVersionDetails,
  getVersion,
};
