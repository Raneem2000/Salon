const controller = {
  Banner: "Banner",
  Booking: "Booking",
  Cards: "Cards",
  Category: "Category",
  City: "City",
  Country: "Country",
  Coupon: "Coupon",
  CpManagement: "CpManagement",
  Customer: "Customer",
  Employee: "Employee",
  Feedback: "Feedback",
  Fqa: "Fqa",
  Notification: "Notification",
  Permission: "Permission",
  Salon: "Salon",
  SearchWord: "SearchWord",
  Service: "Service",
  Version: "Version",
  file: "File",
  Empolyee: "Employee",
};
const Banner = {
  GET_ALL_BANNER_CP: `${controller.Banner}/BannerGetAllCp`,
  GET_BANNER_BY_ID_CP: `${controller.Banner}/BannerGetByIdCp`,
  SET_BANNER_CP: `${controller.Banner}/BannerSetCp`,
  DELETE_BANNER_CP: `${controller.Banner}/BannerDeleteCp`,
};

const Category = {
  GET_ALL_CATEGORY_CP: `${controller.Category}/CategoryGetAllCp`,
  GET_CATEGORY_BY_ID_CP: `${controller.Category}/CategoryGetByIdCp`,
  SET_CATEGORY_CP: `${controller.Category}/CategorySetCp`,
  DELETE_CATEGORY_CP: `${controller.Category}/CategoryDeleteCp`,
};

const City = {
  GET_ALL_CP_City: `/${controller.City}/CityGetAll`,
  CITY_GET_BY_COUNTRY: `${controller.City}/CityGetByCountry`,
  GET_CITY_BY_ID: `/${controller.City}/CityGetByIdCp`,
  SET_CITY_CP: `${controller.City}/CitySetCp`,
  DELETE_CITY_CP: `${controller.City}/CityDeleteCp`,
};
const Country = {
  GET_ALL_CP_Country: `/${controller.Country}/CountryGetAll`,
  GET_Country_BY_ID: `/${controller.Country}/CountryGetByIdCp`,
  SET_COUNTRY_CP: `${controller.Country}/CountrySetCp`,
  DELETe_CP_Country: `/${controller.Country}/CountryDeleteCp`,
};

const Coupon = {
  GET_COUPONS_CP: `${controller.Coupon}/GetCouponsCp`,
  GET_COUPON_CP: `${controller.Coupon}/GetCouponCp`,
  SET_COUPON_CP: `${controller.Coupon}/SetCouponCp`,
  DELETE_COUPON_CP: `${controller.Coupon}/DeleteCouponCp`,
  GET_CUSTOMER_COUPONS: `${controller.Coupon}/GetCustomerCuopons`,
};

const CpManagement = {
  LOGIN_CP: `${controller.CpManagement}/LogInCp`,
  SET_USER_CP: `${controller.CpManagement}/SetUserCp`,
  GET_USERS_CP: `${controller.CpManagement}/GetUsersCp`,
  GET_USER_BY_ID_CP: `${controller.CpManagement}/GetUserCpById`,
  DELETE_USER_CP: `${controller.CpManagement}/DeleteCpUser`,
  GET_ROLES_CP: `${controller.CpManagement}/GetRolesCp`,
  GET_CUSTOMERS_NAMES_CP: `${controller.CpManagement}/GetCustomersNamesCp`,
};

const Notifications = {
  GET_ALL_NOTIFICATION_CP: `${controller.Notification}/NotificationGetAllCp`,
  GET_NOTIFICATION_BY_ID: `${controller.Notification}/NotificationGetByIdCp`,
  SET_NOTIFICATION_CP: `${controller.Notification}/NotificationSetCp`,
  DELETE_NOTIFICATION_CP: `${controller.Notification}/NotificationDeleteCp`,
};
const Permission = {
  GET_ROLES_CONTENTS: `${controller.Permission}/GetRolesContents`,
  GET_CONTENTS_BY_ROLE_ID: `${controller.Permission}/GetContentsByRoleId`,
  SET_PERMISSION: `${controller.Permission}/SetPermission`,
};
const Salon = {
  GET_ALL_SALON_CP: `${controller.Salon}/SalonGetAllCp`,
  GET_SALON_DETAILS_CP: `${controller.Salon}/GetSalonDetailsCp`,
  SET_SALON: `${controller.Salon}/SetSalon`,
  DELETE_SALON: `${controller.Salon}/DeleteSalonCp`,
};
const Employee = {
  GET_ALL_Employee_CP: `${controller.Employee}/GetSalonEmployees`,
  GET_Employee_DETAILS_CP: `${controller.Employee}/GetEmployeeDetailsCp`,
  SET_Employee: `${controller.Employee}/SetEmployeeCp`,
  DELETE_Employee: `${controller.Employee}/DeleteEmployeeCp`,
  GET_Service_BY_EMPID:`${controller.Employee}/GetEmployeeDetailsCp`,
  SET_EMpSERVICE:`${controller.Employee}/SetEmployeeServiceCp`,
  Delet_ServEmp : `${controller.Employee}/DeleteEmployeeServiceCp`
};
const Version = {
  SET_VERSION_CP: `${controller.Version}/VersionSetCp`,
  DELETE_VERSION_CP: `${controller.Version}/VersionDeleteCp`,
  GET_VERSION : `${controller.Version}/VersionGetAll`,
  GET_Version_BY_Id:`${controller.Version}/VersionGetById`

};
const Service = {
  SET_SERVICE_CP: `${controller.Service}/SetServiceCp`,
  DELETE_SERVICE : `${controller.Service}/DeleteServiceCp`,
  GET_BY_ID:`${controller.Service}/GetServiceDetailsCp`,
  GET_SalonID_ByService : `${controller.Service}/GetSalonIdByServiceId`
};
// const EmpService = {
//   SET_EmpSERVICE_CP: `${controller.Service}/SetServiceCp`,
//   DELETE_SERVICE : `${controller.Service}/DeleteServiceCp`,
//   GET_BY_ID:`${controller.Service}/GetServiceDetailsCp`
// };
const Feedback = {
  GET_FEEDBACK_CP: `${controller.Feedback}`,
};
const File = {
  GET_FILE_CP: `${controller.file}/SaveFile`,
  DELETE_FILE_CP: `${controller.file}/DeleteFile`,
};
const FQA = {
  GET_ALL_FQA: `${controller.Fqa}/FqaGetAll`,
  GET_FQA_BY_ID: `${controller.Fqa}/FqaGetById`,
  SET_FQA: `${controller.Fqa}/FqaSet`,
  DELETE_FQA: `${controller.Fqa}/FqaDelete`,
};
const Booking = {
  GET_ALL_Booking_CP: `${controller.Booking}/GetBookningAllCp`,
  Get_Booking_Details_Cp: `${controller.Booking}/GetBookningDetailsCp`,
  Get_Booking_Status_Cp: `${controller.Booking}/ChangeBookingStatusCp`,
};
export const API_Routes = {
  Banner,
  Category,
  City,
  Country,
  Coupon,
  CpManagement,
  Notifications,
  Permission,
  Salon,
  Version,
  Service,
  Feedback,
  File,
  FQA,
  Employee,
  Booking,
};
