import { GetCustomersNamesCpType } from "../../../API/CpManagement/type";
import { INameAndId } from "../../../interface/generic";

export interface AddCouponType {
  name: string;
  code: string;
  fromDate: string;
  toDate: string;
  image: string;
  value: number | undefined;
  percentage: number | undefined;
  country: INameAndId | null;
  city?: INameAndId | null;
  customers: GetCustomersNamesCpType[];
}
