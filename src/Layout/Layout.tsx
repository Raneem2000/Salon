import { FC } from "react";
import SideBarrr from "./SideBar";
import Topbar from "./Topbar";
import { Outlet } from "react-router";
interface Children {
  children?: React.ReactNode;
}
const Layout: FC<Children> = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%"
        }}
      >
        <SideBarrr />
        <div
          style={{
            width: "100%",
          }}
        >
          <Topbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Layout;
