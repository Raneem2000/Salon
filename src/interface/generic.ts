export interface IPagination<T> {
  pageNumber: number;
  totalPages: number;
  totalDataCount: number;
  data: T[];
}
export interface INameAndId {
  id: string;
  name: string;
}
export interface INameAndIdNumber {
  id: number;
  name: string;
}
export interface IAutoCompleteOption {
  id: string;
  name: string;
}
export interface IPayload {
  EnablePagination?: boolean;
  PageNumber?: number;
  Query?: string;
}
export interface ICity {
  key: string;
  value: string;
}
export type handleCropImgType = (imgFile: File) => void;

export interface IGenericFormInputsDesc {
  arDescription: string;
  enDescription: string;
}
export type IGenericActionParam = {
  value: string;
  key: string;
}[];
export interface IGenericFormInputs {
  id?: string;
  enName: string;
  arName?: string;
}
export type imgNameType = "cover" | "logo";
export type imgNameTypeProdct = "cover" | "images";
export enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
export interface IValue {
  key : string;
  value : string;
}