import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import {
  GetALLCouponsCPType,
  GetCouponCPType,
  GetCustomerCouponsType,
  SetCouponCpType,
  SetCustomerCouponsType,
} from "./type";

const GetAllCouponsCP = async (payload: IPayload) => {
  const { data } = await DeliveryApiInstances.get<
    IPagination<GetALLCouponsCPType>
  >(API_Routes.Coupon.GET_COUPONS_CP, {
    params: {
      ...payload,
    },
  });
  return data;
};

const GetCouponCp = async (id: string | undefined) => {
  const { data } = await DeliveryApiInstances.get<GetCouponCPType>(
    API_Routes.Coupon.GET_COUPON_CP,
    {
      params: {
        id,
      },
    }
  );
  return data;
};

const GetCustomerCoupons = async (params: SetCustomerCouponsType) => {
  const { data } = await DeliveryApiInstances.get<
    IPagination<GetCustomerCouponsType>
  >(API_Routes.Coupon.GET_CUSTOMER_COUPONS, {
    params: {
      isUsed: params.isUsed,
      EnablePagination: params.EnablePagination,
      Query: params.Query,
      PageNumber: params.PageNumber,
    },
  });
  return data;
};

const SetCouponCp = async (data: SetCouponCpType) => {
  await DeliveryApiInstances.post(API_Routes.Coupon.SET_COUPON_CP, data);
};

const DeleteCouponCp = async (id: string) => {
  await DeliveryApiInstances.put(API_Routes.Coupon.DELETE_COUPON_CP, null, {
    params: {
      id: id,
    },
  });
};
export const CouponApi = {
  GetAllCouponsCP,
  GetCouponCp,
  GetCustomerCoupons,
  SetCouponCp,
  DeleteCouponCp,
};
