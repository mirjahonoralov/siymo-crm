import { createAsyncThunk } from "@reduxjs/toolkit";
import i18next from "i18next";
import { httpRequest } from "../../utils/request";
import { openSnackbar } from "../slices/mainSlice";
import { processPostT } from "../slices/processSlice";

export const getProcessManagersThunk = createAsyncThunk(
  "process/getProcessManagersThunk",
  async (query: any, thunkAPI) => {
    const page = query.get("page");
    const name = query.get("search-name");

    return await thunkAPI.dispatch(
      httpRequest({
        url: `api/managers/with/pagination/?${page ? `&page=${page}` : ""}${
          name ? `&name=${name}` : ""
        }`,
      })
    );
  }
);

export const getProcessThunk = createAsyncThunk(
  "process/getProcessThunk",
  async (query: any, thunkAPI) => {
    const ordering = query.get("ordering");
    const searchName = query.get("search-name");
    const date_from = query.get("date_from");
    const date_to = query.get("date_to");
    const activity = query.get("activity");
    const work = query.get("work");
    const manager = query.get("manager");
    return await thunkAPI.dispatch(
      httpRequest({
        url: `notification/?${activity ? `&activity=${activity}` : ""}${
          work ? `&work=${work}` : ""
        }${date_from ? `&date_from=${date_from}` : ``}${
          date_to ? `&date_to=${date_to}` : ``
        }${ordering ? `&ordering=${ordering}` : ``}${
          manager ? `&manager=${manager}` : ``
        }${searchName ? `&name=${searchName}` : ``}`,
      })
    );
  }
);

export const createProcessThunk = createAsyncThunk(
  "process/createProcessThunk",
  async (data: processPostT, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `notification/`,
        method: "POST",
        body: {
          ...data,
          activity: data.activity?.id,
          work: data.work?.id,
          name: data.name,
        },
      })
    );

    if (res.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.created"),
        })
      );

      return res;
    }
  }
);

export const editProcessThunk = createAsyncThunk(
  "process/editProcessThunk",
  async (data: processPostT, thunkAPI) => {
    const { selectedItems } = (thunkAPI.getState() as any).process;

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `notification/${selectedItems[0]}/`,
        method: "PUT",
        body: {
          ...data,
          activity: data.activity?.id,
          work: data.work?.id,
          name: data.name,
        },
      })
    );

    if (res.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.created"),
        })
      );

      return res;
    }
  }
);

// export const createProcessWithClientThunk = createAsyncThunk(
//   "process/createProcessWithClientThunk",
//   async (
//     data: {
//       clientData: clientDataT;
//       processData: processPostT;
//     },
//     thunkAPI
//   ) => {
//     const { clientData, processData } = data;

//     const res = await thunkAPI.dispatch(
//       httpRequest({
//         url: `client/contact/`,
//         method: "POST",
//         body: { ...clientData, activity: clientData.activity?.id },
//       })
//     );

//     if (res.id) {
//       const res2 = await thunkAPI.dispatch(
//         httpRequest({
//           url: `notification/`,
//           method: "POST",
//           body: { manager: processData.manager, client: res.id },
//         })
//       );

//       if (res2.id) {
//         thunkAPI.dispatch(
//           openSnackbar({
//             status: "success",
//             message: i18next.t("settings.snackbar.created"),
//           })
//         );

//         return res;
//       }
//     }
//   }
// );

export const deleteProcessThunk = createAsyncThunk(
  "process/deleteProcessThunk",
  async (_, thunkAPI) => {
    const ids = (thunkAPI.getState() as any).process.selectedItems;
    const res = await thunkAPI.dispatch(
      ids.length > 1
        ? httpRequest({
            url: `notification/delete_notifications/`,
            method: "DELETE",
            body: { ids },
            noJson: true,
          })
        : httpRequest({
            url: `notification/${ids[0]}/`,
            method: "DELETE",
            noJson: true,
          })
    );

    if (res.status === 204 || res.status === 200) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.deleted"),
        })
      );
      return { status: "success" };
    }
  }
);
