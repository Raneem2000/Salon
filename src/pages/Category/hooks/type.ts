export interface AddCategoryType {
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
  image: string;
  type: 0 | 1 | 2 | null;
}
