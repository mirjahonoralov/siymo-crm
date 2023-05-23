import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getManagersThunk } from "../actions/mainActions";

export type managerT = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  telegram: string;
  username: string;
  password2: string;
  role: string;
  activity: {
    id: number;
    name: string;
  };
};

export type roleT = {
  id: number;
  name: string;
  value: string;
};

const initialState = {
  snackbar: {
    open: false,
    status: "success",
    message: "",
  },
  managers: [] as managerT[],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    openSnackbar: (
      state,
      action: PayloadAction<{ status: string; message: string }>
    ) => {
      const { status, message } = action.payload;
      state.snackbar.open = true;
      state.snackbar.status = status;
      state.snackbar.message = message;
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
  extraReducers: {
    [(getManagersThunk as any).pending]: (state) => {},
    [(getManagersThunk as any).fulfilled]: (
      state,
      action: PayloadAction<managerT[]>
    ) => {
      state.managers = action.payload;
    },
  },
});

export const { openSnackbar, closeSnackbar } = mainSlice.actions;
export default mainSlice.reducer;
