import { createAsyncThunk } from "@reduxjs/toolkit";
import i18next from "i18next";
import { httpRequest } from "../../utils/request";
import { employeePostType, employeeType } from "../slices/employeesSlice";
import { openSnackbar } from "../slices/mainSlice";

export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (query: any, thunkAPI): Promise<employeeType[]> => {
    const name = query.get("search-name");
    const page = query.get("page");
    return await thunkAPI.dispatch(
      httpRequest({
        url: `api/workers/?${name ? `&name=${name}` : ``}${
          page ? `&page=${page}` : ``
        }`,
      })
    );
  }
);

export const createEmployeeThunk = createAsyncThunk(
  "employees/createEmployeeThunk",
  async (
    body: { data: employeeType | employeePostType; imageFile: File | null },
    thunkAPI
  ) => {
    const { data, imageFile } = body;
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("password2", data.password2);
    formData.append("phone_number", data.phone_number);
    formData.append("role", data.role);
    formData.append("username", data.username);
    formData.append("image", imageFile || "");

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `api/workers/`,
        method: "POST",
        body: formData,
        haveImg: true,
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

export const deleteEmployeeThunk = createAsyncThunk(
  "employees/deleteEmployeeThunk",
  async (_, thunkAPI) => {
    const ids = (thunkAPI.getState() as any).employees.selectedItems;
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `api/workers/${ids[0]}/`,
        method: "DELETE",
        noJson: true,
      })
    );

    if (res.status === 204) {
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

export const editEmployeeThunk = createAsyncThunk(
  "employees/editEmployeeThunk",
  async (
    body: { data: employeeType | employeePostType; imageFile: File | null },
    thunkAPI
  ) => {
    const { data, imageFile } = body;
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("password2", data.password2);
    formData.append("phone_number", data.phone_number);
    formData.append("role", data.role);
    formData.append("username", data.username);
    formData.append("image", imageFile || "");

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `api/workers/${(data as employeeType).id}/`,
        method: "PUT",
        body: formData,
        haveImg: true,
      })
    );

    if (res.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.updated"),
        })
      );
      return res;
    }
  }
);

export const getEmployeeActions = createAsyncThunk(
  "employee/getEmployeeActions",
  async ({ query, clear }: { query: any; clear: boolean }, thunkAPI) => {
    const id = query.get("id");
    const type_of_job = query.get("type_of_job");
    const type_of_work = query.get("type_of_work");
    const name = query.get("search-client-name");
    const price_from = query.get("price_from");
    const price_to = query.get("price_to");
    const date_from = query.get("date_from");
    const date_to = query.get("date_to");

    if (clear)
      return await thunkAPI.dispatch(
        httpRequest({ url: `api/workers/worker_detail_by_works/?id=${id}` })
      );
    else
      return await thunkAPI.dispatch(
        httpRequest({
          url: `api/workers/worker_detail_by_works/?id=${id}${
            type_of_job ? `&type_of_job=${type_of_job}` : ""
          }${type_of_work ? `&type_of_work=${type_of_work}` : ""}${
            date_from ? `&date_from=${date_from}` : ``
          }${date_to ? `&date_to=${date_to}` : ``}${
            price_to ? `&price_to=${price_to}` : ``
          }${price_from ? `&price_from=${price_from}` : ``}${
            name ? `&name=${name}` : ``
          }`,
        })
      );
  }
);
