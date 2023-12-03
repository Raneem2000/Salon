import { IAutoCompleteOption } from "../../interface/generic";

export interface GetAllBannerCpType {
  
    id: string;
    fromDate: string;
    toDate: string;
    link?: string;
    serviceId?: string;
    salonId?: string;
    imageURl: string;
  
}
export interface GetBannerByIdType {
  id: string;
  fromDate: string;
  toDate: string;
  link: string;
  imageURl: string;
  serviceId?: string;
  salonId?: string;
  cityId?: string;
}
export interface Banner {
  id?: string;
  fromDate: string;
  toDate: string;
  link?: string;
  image: string;
}
export interface SetBannerTypeData extends Banner{
  serviceId?: string;
  salonId?: string;
  citytId?: string;
}
export interface SetBannerTypeInput extends Banner {
  service : IAutoCompleteOption;
  salon : IAutoCompleteOption;
  city : IAutoCompleteOption;
}