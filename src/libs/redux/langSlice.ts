import { createSlice } from "@reduxjs/toolkit";

const InitialValues = {
  lang: localStorage.getItem("lang") ?? 'en',
};
const langSlice = createSlice({
    name: "lang",
    initialState: InitialValues,
    reducers: {
      setLang: (state, action) => {
        state.lang = action.payload;
      },
    },
  });
  export default langSlice;
export const langActions = langSlice.actions;
  