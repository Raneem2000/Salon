import { API_Routes } from "../../Constants/ApiRoutes";
import DeliveryApiInstances from "../axios";
import { IPermissionGet } from "./type";

const SetCpPermission = async (params: IPermissionGet) => {
  await DeliveryApiInstances.post(API_Routes.Permission.SET_PERMISSION, params);
};

const GetContentsByRoleId = async (roleId: string | undefined) => {
  const { data } = await DeliveryApiInstances.get<IPermissionGet>(
    API_Routes.Permission.GET_CONTENTS_BY_ROLE_ID,
    {
      params: {
        roleId,
      },
    }
  );
  return data;
};

const GetRolesContents = async () => {
  const { data } = await DeliveryApiInstances.get<IPermissionGet[]>(
    API_Routes.Permission.GET_ROLES_CONTENTS
  );
  return data;
};

export const PermissionApi = {
  SetCpPermission,
  GetContentsByRoleId,
  GetRolesContents,
};
