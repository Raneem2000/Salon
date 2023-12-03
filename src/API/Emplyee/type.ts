import { IAutoCompleteOption, IValue } from "../../interface/generic";
import { Day, salonType } from "../Salon/type";

export interface EmployeeAllPayload {
  salonId: string;
}

export interface GetEmplyeeAll {
  id: string;
  empName: string;
  image: string;
  rate: number;
}
export interface Employee {
  id?: string;
  image: string;
  userName: string;
  certificates: string;
  description: string;
  experienceYears: string;
}
export interface EmpInput extends Employee {
  salon: IAutoCompleteOption;
  gender: salonType;
  workSchedule: {
    day: Day;
    startTime: string;
    endTime: string;
    isFree: boolean;
  }[];
}

export interface EmployeeData extends Employee {
  empName?: string;
  salonId: string;
  gender: number;
  workSchedule: {
    day: number;
    startTime: string;
    endTime: string;
    isFree: boolean;
  }[];

}
export interface EmployeeService {
  services : {
    id : string;
    name : IValue [];
    price : number;
    offerPrice : number;
    rate : number;
    coverImage : string
  }[]
}
export interface EmpServicINput {
  employee : IAutoCompleteOption;
  services : IAutoCompleteOption []
}
export interface EmpServiceData {
  employeeId : string;
  services : string []
}
export interface ServEmpId {
  EmployeeId :string ;
  ServiceId : string
}