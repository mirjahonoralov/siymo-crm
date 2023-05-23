import { createAsyncThunk } from "@reduxjs/toolkit";
import i18next from "i18next";
import { httpRequest } from "../../utils/request";
import { dataType, postDataType } from "../slices/contactSlice";
import { openSnackbar } from "../slices/mainSlice";

export const getContact = createAsyncThunk(
  "contact/getContact",
  async (query: any, thunkAPI): Promise<dataType[]> => {
    const ordering = query.get("ordering");
    const searchName = query.get("search-client-name");
    const name = query.get("search-name");
    const activity = query.get("activity");
    const from = query.get("from");
    const to = query.get("to");
    const page = query.get("page");

    return await thunkAPI.dispatch(
      httpRequest({
        url: `client/contact/?${ordering ? `ordering=${ordering}` : ""}${
          activity ? `&activity=${activity}` : ""
        }${from ? `&date_from=${from}` : ``}${to ? `&date_to=${to}` : ``}${
          searchName ? `&name=${searchName}` : ``
        }${page ? `&page=${page}` : ``}${name ? `&name=${name}` : ``}`,
      })
    );
  }
);

export const getContactById = createAsyncThunk(
  "contact/getContactById",
  async (id: number, thunkAPI) =>
    await thunkAPI.dispatch(httpRequest({ url: `client/contact/${id}/` }))
);

export const getContactActions = createAsyncThunk(
  "contact/getContactActions",
  async (id: string, thunkAPI) =>
    await thunkAPI.dispatch(
      httpRequest({
        url: `client/contact/get_client_contact_works/?id=${id}`,
      })
    )
);

export const createContactThunk = createAsyncThunk(
  "contact/createTypeThunk",
  async (data: postDataType, thunkAPI) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("telegram", data.telegram);
    formData.append("phone_number", data.phone_number);
    formData.append("activity", String(data.activity!.id));

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `client/contact/`,
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

export const deleteContactThunk = createAsyncThunk(
  "contact/deleteContactThunk",
  async (_, thunkAPI) => {
    const ids = (thunkAPI.getState() as any).contact.selectedItems;
    const res = await thunkAPI.dispatch(
      ids.length > 1
        ? httpRequest({
            url: `client/contact/delete_client_contact/`,
            method: "DELETE",
            body: { ids },
            noJson: true,
          })
        : httpRequest({
            url: `client/contact/${ids[0]}/`,
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

export const editContactThunk = createAsyncThunk(
  "contact/editContactThunk",
  async (data: dataType, thunkAPI) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("telegram", data.telegram);
    formData.append("phone_number", data.phone_number);
    formData.append("activity", String(data.activity!.id));

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `client/contact/${data.id}/`,
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
