export interface SetLogInType {
  username: string;
  password: string;
}
export interface GetLogInType {
  userId: string;
  token: string;
  refreshToken: string;
  roleId : string
}
export interface GetRoles {
  id: string;
  name: string;
}
export interface SetUserType {
  userId?: string;
  username: string;
  password: string;
  roleId?: string;
  roles?: {
    id:string;
    name : string
  };
}
export interface GetUsersType {
  id: string;
  username: string;
  role: string;
}
export interface GetRoles {
  id: string;
  username: string;
  role: string;
}
[];
export interface GetCustomersNamesCpType {
  userId: string;
  userName: string;
  phoneNumber: number;
}
