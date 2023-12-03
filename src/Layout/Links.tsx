import { useTranslation } from "react-i18next";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import DiscountIcon from "@mui/icons-material/Discount";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import FeedbackIcon from "@mui/icons-material/Feedback";
import UpdateIcon from "@mui/icons-material/Update";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SecurityIcon from "@mui/icons-material/Security";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { askForPermissionRoutes } from "../helper/askForPermission";
const Links = () => {
  const { t } = useTranslation();

  const dashBoardNavLinks = [
    {
      title: t("links.cpMangment"),
      href: "/cp-management",
      icon: <GroupIcon />,
      enable: askForPermissionRoutes("CpManagement"),
    },
    {
      title: t("links.Permission"),
      href: "/permission",
      icon: <SecurityIcon />,
      enable: askForPermissionRoutes("Permission"),
    },
    {
      title: t("links.category"),
      href: "/category",
      icon: <CategoryIcon />,
      enable: askForPermissionRoutes("Category"),
    },
    {
      title: t("links.notification"),
      href: "/notifications",
      icon: <NotificationsIcon />,
      enable: askForPermissionRoutes("Notification"),
    },
    {
      title: t("links.country"),
      href: "/country",
      icon: <FlagIcon />,
      enable: askForPermissionRoutes("Country"),
    },
    {
      title: t("links.city"),
      href: "/city",
      icon: <LocationCityIcon />,
      enable: askForPermissionRoutes("City"),
    },
    {
      title: t("links.salon"),
      href: "/salon",
      icon: <HomeIcon />,
      enable: true,
    },
    {
      title: t("links.coupon"),
      href: "/coupon",
      icon: <DiscountIcon />,
      enable: askForPermissionRoutes("Coupon"),
    },
    {
      title: t("links.banner"),
      href: "/banner",
      icon: <ViewCarouselIcon />,
      enable: askForPermissionRoutes("Banner"),
    },
    {
      title: t("links.FeedBack"),
      href: "/feedBack",
      icon: <FeedbackIcon />,
      enable: askForPermissionRoutes("Feedback"),
    },
    {
      title: t("links.version"),
      href: "/version",
      icon: <UpdateIcon />,
      enable: askForPermissionRoutes("Version"),
    },
    {
      title: t("links.booking"),
      href: "/booking",
      icon: <ShoppingCartCheckoutIcon />,
      enable: askForPermissionRoutes("Booking"),
    },
    {
      title: t("links.fqa"),
      href: "/fQa",
      icon: <HelpOutlineIcon />,
      enable: askForPermissionRoutes("Fqa"),
    },
  ];
  return {
    dashBoardNavLinks,
  };
};
export default Links;
