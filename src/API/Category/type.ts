export interface GetAllCategoryType {
  id: string;
  name: {
    key: string;
    value: string;
  }[];
  imageUrl: string;
  parentCategoryId: string;
  type: number;
}
export interface GetCategoryByIdType {
  id: string;
  name: [
    {
      key: "ar";
      value: string;
    },
    {
      key: "en";
      value: string;
    }
  ];
  imageUrl: string;
  type: 0 | 1;
}
export interface SetCategoryType {
  id?: string;
  name: {
    key: string;
    value: string;
  }[];
  image: string;
  type: number;
}
