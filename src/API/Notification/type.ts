export interface setNotificationCpType {
  id?: string;
  title: [
    {
      key: "ar";
      value: string;
    },
    {
      key: "en";
      value: string;
    }
  ];
  body: [
    {
      key: "ar";
      value: string;
    },
    {
      key: "en";
      value: string;
    }
  ];
  notificationType: 1 | 2 | 3;
  users: string[];
  cityId: string;
  appType: number;
}

export interface getNotificationCpType {
  id: string;
  title: {
    key: string;
    value: string;
  }[];
  body: {
    key: string;
    value: string;
  }[];
  appType: number;
  createdAt: string;
  cityId: string;
  customers: {
    id: string;
    name: string;
    phoneNumber: number;
  }[];
  notificationType: number;
}
