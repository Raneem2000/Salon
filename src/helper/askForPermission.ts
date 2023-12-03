import { useSelector } from "react-redux";
import { RootState } from "../libs/redux/index";

type Type =
  | "Banner"
  | "Product"
  | "Country"
  | "Category"
  | "City"
  | "CpManagement"
  | "Customer"
  | "File"
  | "Notification"
  | "Order"
  | "Brand"
  | "Offer"
  | "SearchWord"
  | "ShippingCompany"
  | "Store"
  | "Variant"
  | "Permission"
  | "Feedback"
  | "Coupon"
  |"Version"
  |"Booking"
  |"Fqa"

export const askForPermission = (name: Type) => {
  const contents = useSelector((state: RootState) => state.permission.contents);

  const content = contents?.filter((content) => name === content.name);
  if (content === undefined) {
    return {
      canAdd: false,
      canView: false,
      canDelete: false,
      canDownload: false,
      canEdit: false,
    };
  }

  return content[0];
};

export const askForPermissionRoutes = (name: Type) => {
  const contents = useSelector((state: RootState) => state.permission.contents);
  const content = contents?.filter((content) => name === content.name);
  return content && content[0]?.canView === true;
};
