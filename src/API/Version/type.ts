

export interface VersionGet {
  id?: string;
  title: string;
  body: string;
  iosVersionNumber: number;
  iosVersionName: string;
  androidVersionNumber: number;
  androidVersionName: string;
  androidUrl: string;
  iosUrl: string;
  isRequired: boolean;
 
}

export interface VersionInput  extends VersionGet{
  appType: appType;
}
export interface VersionData extends VersionGet {
  appType : number
}
export interface appType {
  id: number;
  name: string;
}
export const AppTypeArray: appType[] = [
  { id: 0, name: "Customer" },
  { id: 1, name: "Store" },
  { id: 2, name: "Driver" },
];
