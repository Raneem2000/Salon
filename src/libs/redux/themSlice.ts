import { createSlice } from "@reduxjs/toolkit";
import {PaletteMode} from "@mui/material"

const InitialValues  = {
  mode: localStorage.getItem('mode') ?? 'light'  as PaletteMode ,
};

const themSlice = createSlice({
  name: "them",
  initialState: InitialValues,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export default themSlice;
export const themAction = themSlice.actions;
