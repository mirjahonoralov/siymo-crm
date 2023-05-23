import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "../../utils/request";
import { managerT } from "../slices/mainSlice";

// export const getManagers = async (
//     dispatch: any,
//     searchEmployee: string
//   ): Promise<searchedEmployeeT[]> =>
//     await dispatch(
//       httpRequest({
//         url: `api/managers/?${searchEmployee ? `name=${searchEmployee}` : ""}`,
//       })
//     );

export const getManagersThunk = createAsyncThunk(
  "main/getManagersThunk",
  async (searchEmployee: string, thunkAPI): Promise<managerT[]> =>
    await thunkAPI.dispatch(
      httpRequest({
        url: `api/managers/?${searchEmployee ? `name=${searchEmployee}` : ""}`,
      })
    )
);
