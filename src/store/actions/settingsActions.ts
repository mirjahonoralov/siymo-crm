import { createAsyncThunk } from "@reduxjs/toolkit";
import i18next from "i18next";
import { httpRequest } from "../../utils/request";
import { employeePostType, employeeType } from "../slices/employeesSlice";
import { openSnackbar } from "../slices/mainSlice";
import { dataTypeT } from "../slices/settingsSlice";

const deleteUrls = [
  { key: "work/type", value: "delete_work_types" },
  { key: "job/type", value: "delete_job_types" },
  { key: "customer/activity", value: "delete_customer_activities" },
  { key: "reason", value: "delete_reasons" },
  { key: "survey", value: "delete_surveys" },
];

export const getProfileThunk = createAsyncThunk(
  "settings/getProfileThunk",
  async (_, thunkAPI): Promise<employeeType[]> =>
    await thunkAPI.dispatch(
      httpRequest({
        url: `api/profile/`,
      })
    )
);

export const editProfileThunk = createAsyncThunk(
  "settings/editProfileThunk",
  async (
    body: { data: employeePostType; imageFile: File | null },
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
        url: `api/profile/`,
        method: "PATCH",
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

export const getTypes = createAsyncThunk(
  "settings/getTypes",
  async (
    { url, dataType }: { url: string; dataType?: dataTypeT },
    thunkAPI
  ) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `settings/api/${url}/`,
      })
    );

    return { data: res, dataType };
  }
);

export const createTypeThunk = createAsyncThunk(
  "settings/createTypeThunk",
  async (
    { data, url, dataType }: { data: any; url: string; dataType?: dataTypeT },
    thunkAPI
  ) => {
    const { newTypeName } = (thunkAPI.getState() as any).settings;

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `settings/api/${url}/`,
        method: "POST",
        body: data.name ? data : { name: newTypeName! },
      })
    );

    if (res.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.created"),
        })
      );
      return { data: res, dataType };
    }
  }
);

export const editTypeThunk = createAsyncThunk(
  "settings/editTypeThunk",
  async (
    {
      url,
      dataType,
      workTypeId,
    }: { url: string; dataType?: dataTypeT; workTypeId?: number },
    thunkAPI
  ) => {
    const { editingItem, newTypeName } = (thunkAPI.getState() as any).settings;

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `settings/api/${url}/${editingItem.id}/`,
        method: "PUT",
        body:
          dataType === "workTypes"
            ? { name: newTypeName, type_of_job: workTypeId }
            : { name: newTypeName },
      })
    );

    if (res.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.updated"),
        })
      );
      return {
        data:
          dataType === "workTypes"
            ? {
                ...editingItem,
                name: newTypeName,
                type_of_job: workTypeId,
              }
            : { ...editingItem, name: newTypeName },
        dataType,
      };
    }
  }
);

export const deleteTypeThunk = createAsyncThunk(
  "settings/deleteType",
  async (
    { url, dataType }: { url: string; dataType?: dataTypeT },
    thunkAPI
  ) => {
    const deleteSomeUrl = deleteUrls.find((item) => item.key === url)?.value;
    const ids = (thunkAPI.getState() as any).settings.selectedItems;
    const res = await thunkAPI.dispatch(
      ids.length > 1
        ? httpRequest({
            url: `settings/api/${url}/${deleteSomeUrl}/`,
            method: "DELETE",
            body: { ids },
            noJson: true,
          })
        : httpRequest({
            url: `settings/api/${url}/${ids[0]}/`,
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
      return { status: true, dataType };
    }
  }
);
