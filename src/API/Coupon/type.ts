import { IPayload } from "../../interface/generic";

export interface GetALLCouponsCPType {
  id: string;
  name: string;
  code: string;
  image: string;
  fromDate: string;
  toDate: string;
  value: number;
  percentage: number;
  cityId: string;
  isExpired: boolean;
}

export interface GetCouponCPType {
  id: string;
  name: string;
  code: string;
  image: string;
  fromDate: string;
  toDate: string;
  value: number;
  type: 0 | 1 | 2;
  percentage: number;
  cityId: string;
  userInfo: {
    id: string;
    name: string;
    phoneNumber: number;
  }[];
}
export interface SetCouponCpType {
  id?: string;
  name: string;
  code: string;
  fromDate: string;
  toDate: string;
  image: string;
  value?: number | undefined;
  percentage: number | undefined;
  cityId: string | undefined;
  type: number;
  customers: string[] | undefined;
}

export interface SetCustomerCouponsType extends IPayload {
  isUsed: boolean;
}
export interface GetCustomerCouponsType {
  id: string;
  name: string;
  code: string;
  percentage: number;
  value: number;
  image: string;
  toDate: Date;
}
