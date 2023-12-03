import { configureStore } from "@reduxjs/toolkit";
import themSlice from "./themSlice";
import langSlice from "./langSlice";
import PermissionSlice from "./permissions-slice";

const store = configureStore({
  reducer: {
    them: themSlice.reducer,
    lang:langSlice.reducer,
    permission : PermissionSlice.reducer
  },
});

export const UIActions = themSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
