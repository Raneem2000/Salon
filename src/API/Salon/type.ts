import { IAutoCompleteOption, IPayload } from "../../interface/generic";

export interface GetAllSalonType {
  id: string;
  name: string;
  description: string;
  rate: number;
  logo: string | null;
  salonType: 0;
}
export interface GetSalonDetailsParamsType extends IPayload {
  salonId: string;
}
export interface Salon {
  name: string;
  description: string;
  phoneNumber: string;
  tempPhoneNumber: string;
  facebookUrl: string;
  instagramUrl: string;

  imageUrls: string[];
}
export interface GetSalonDetailsType {
  name: string;
  description: string;
  rate: number;
  phoneNumber: string;
  tempPhoneNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  logo: string;
  salonType: number;
  coverImage: string;
  imageUrls: string[];
  address: {
    latitude: number;
    longitude: number;
    cityId: string;
  };
  workSchedule: {
    day: number;
    startTime: string;
    endTime: string;
    isFree: boolean;
  }[];
}
export interface SalonInput extends Salon {
  coverImage: string;
  SalonType: salonType;
  latitude: number;
  longitude: number;
  city: IAutoCompleteOption;
  country: IAutoCompleteOption;
  workSchedule: {
    day: Day;
    startTime: string;
    endTime: string;
    isFree: boolean;
  }[];
}
export interface SalonData extends Salon {
  id?: string;
  logo: string;
  salonType: number;
  address: {
    latitude: number;
    longitude: number;
    cityId: string;
  };
  workSchedule: {
    day: number;
    startTime: string;
    endTime: string;
    isFree: boolean;
  }[];
}
export interface salonType {
  id: number;
  name: string;
}
export const SalonTypeArray: salonType[] = [
  { id: 0, name: "Male" },
  { id: 1, name: "Female" },
];
export interface Day {
  id: number;
  day: string;
}
export const DayArray: Day[] = [
  { id: 0, day: "Sunday" },
  { id: 1, day: "Monday" },
  { id: 2, day: "Tuseday" },
  { id: 3, day: "Wensday" },
  { id: 4, day: "Thursday" },
  { id: 5, day: "Friday" },
  { id: 6, day: "Saturday" },
];
