import { IAutoCompleteOption, ICity, IPayload } from "../../interface/generic";

export interface getCityAllType {
  id: string;
  name: string;
  countryId: string;
}
export interface setCityTypeInput {
  id: string;
  arName: string;
  enName: string;
  country: IAutoCompleteOption;
}
export interface setCityType {
  id?: string;
  name: ICity[];
  countryId: string;
}
export interface getCityByIdType {
  id?: string;
  name: ICity[];
  countryId: string;
}
export interface getCityByCountryType extends IPayload {
  CountryId: string;
  enabled: boolean;
}
