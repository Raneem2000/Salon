import { IAutoCompleteOption, IPayload, IValue } from "../../interface/generic";
export interface IPaginationService{
  services: {
    pageNumber: number;
    totalPages: number;
    totalDataCount: number;
    data: ServiceGet[];
  };
}
export interface ServiceGet {
  id: string;
  name: IValue[];
  price: number;
  offerPrice: number;
  rate: number;
  coverImage: string;
}
export interface ServicePayload extends IPayload {
  salonId: string;
}
export interface Service {
  id?:string;
  price : number;
  offerPrice : number;
  period :  string;
  coverImage : string;
  images : string[];
  salonId : string;
}
export  interface ServiveInput extends Service {
  arName :string;
  enName : string;
  arDescription : string;
  enDescription : string;
  category: IAutoCompleteOption;
}
export interface ServiceData extends Service {
  name : IValue[]
  description : IValue[];
  categoryId : string;
  deletedImages ?: string[]
}
