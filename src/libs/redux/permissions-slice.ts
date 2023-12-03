import { createSlice } from "@reduxjs/toolkit";
import { IPermissionGet } from "../../API/Permission/type";
// import PermissionApi from "../API/Permission/PermissionApi";
// import { IPermissionGet } from "../API/Permission/type";
const InitialValues: IPermissionGet = {
    roleId: localStorage.getItem("RoleId") ?? "",
    roleName: "",
    contents: [],
  };
  
  const PermissionSlice = createSlice({
    name: "permissions",
    initialState: InitialValues,
    reducers: {
      setRoleId: (state, action) => {
        state.roleId = action.payload;
        console.log(state.roleId)
      },
      setRoleName: (state, action) => {
        state.roleName = action.payload;
      },
      setContent: (state, action) => {
        state.contents = action.payload;
      },
    },
  
    // extraReducers: (builder) => {
    //   builder.addCase(getpermissions.fulfilled, (state, action) => {
    //     state.roleName = action.payload.data?.roleName;
    //     console.log(state.roleName, "soaidasiodvmsaiovmosiav");
    //   });
    // },
  });
  // console.log(PermissionSlice.getInitialState)
  export default PermissionSlice;
  export const PermissionActions = PermissionSlice.actions;
  