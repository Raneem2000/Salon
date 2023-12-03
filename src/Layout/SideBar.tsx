import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../libs/them";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ItemLink from "./ItemLink";
import Links from "./Links";
const SideBarrr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const { dashBoardNavLinks } = Links();
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-menu": {
          height: "100vh",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          display: "flex",
          gap: "5px",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            display="flex"
            flexDirection="column"
            gap="10"
          >
            {dashBoardNavLinks.map((link) => {
              return link.enable ? (
                <ItemLink
                  key={link.href}
                  to={link.href}
                  icon={link.icon}
                  title={link.title}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
              ) : (
                <></>
              );
            })}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBarrr;
