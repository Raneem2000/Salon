export interface getAllFQA {
  id: string;
  question: [
    {
      key: "en";
      value: string;
    },
    {
      key: "ar";
      value: string;
    }
  ];
  answer: [
    {
      key: "en";
      value: string;
    },
    {
      key: "ar";
      value: string;
    }
  ];
}

export interface setFQA {
  id?: string;
  question: {
    key: string;
    value: string;
  }[];
  answer: {
    key: string;
    value: string;
  }[];
}
