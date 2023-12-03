import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../libs/them";
import { FC, ReactNode } from "react";
type IProps = {
  title: string;
  icon: ReactNode;
  selected: string;
  to: string;
  setSelected: (arg: string) => void;
  isCollapsed: boolean;
};
const ItemLink: FC<IProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isCollapsed,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
          width: "100%",
          marginBottom: "12px",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        {isCollapsed ? "" : <Typography fontSize="17px">{title}</Typography>}
        <Link to={to} />
      </MenuItem>
    </>
  );
};
export default ItemLink;
