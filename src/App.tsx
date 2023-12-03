import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./libs/redux";
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "./libs/getDesignTokens";
import Routes from "./Routes";
import RTL from "./libs/lang/Rtl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaletteMode } from "@mui/material";
import { PermissionQueries } from "./API/Permission/PermissionQueries";
import { PermissionActions } from "./libs/redux/permissions-slice";
import Loading from "./Components/Loading";
const App = () => {
  const mode = useSelector((state: RootState) => state.them.mode);
  const lang = useSelector((state: RootState) => state.lang.lang);
  //
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode]
  );
  const dispatch: AppDispatch = useDispatch();
  const roleId = useSelector((state: RootState) => state.permission.roleId);
  // console.log(content);
  const { data, isLoading } = PermissionQueries.GetContentsByRoleIdQuery(
    roleId!
  );

  dispatch(PermissionActions.setRoleName(data?.roleName));
  dispatch(PermissionActions.setContent(data?.contents));
  // console.log(data?.contents);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="bottom-right" />
        {}
        {lang == "ar" ? (
          <RTL>
            <Routes />
          </RTL>
        ) : (
          <Routes />
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
