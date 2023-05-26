import { createAsyncThunk } from "@reduxjs/toolkit";
import i18next from "i18next";
import { httpRequest } from "../../utils/request";
import { openSnackbar } from "../slices/mainSlice";
import { postDataType } from "../slices/contactSlice";

export const getApplications = createAsyncThunk(
  "applications/getApplications",
  async (query: any, thunkAPI) => {
    const date_from = query.get("date_from");
    const date_to = query.get("date_to");
    const type_of_job = query.get("type_of_job");
    const price_from = query.get("price_from");
    const price_to = query.get("price_to");
    const type_of_work = query.get("type_of_work");
    const manager = query.get("manager");
    const page = query.get("page");
    const name = query.get("search-name");
    return await thunkAPI.dispatch(
      httpRequest({
        url: `order/?${type_of_job ? `&type_of_job=${type_of_job}` : ""}${
          type_of_work ? `&type_of_work=${type_of_work}` : ""
        }${date_from ? `&date_from=${date_from}` : ``}${
          date_to ? `&date_to=${date_to}` : ``
        }${manager ? `&manager=${manager}` : ``}${
          price_to ? `&price_to=${price_to}` : ``
        }${price_from ? `&price_from=${price_from}` : ``}${
          page ? `&page=${page}` : ``
        }${name ? `&name=${name}` : ``}`,
      })
    );
  }
);

export const getNotifications = createAsyncThunk(
  "applications/getNotifications",
  async (_, thunkAPI) =>
    await thunkAPI.dispatch(
      httpRequest({ url: "notification/my_notifications/" })
    )
);

export const createApplicationThunk = createAsyncThunk(
  "applications/createApplicationThunk",
  async (data: any, thunkAPI) => {
    // : {order:any, objects: any[]}
    const notification = (thunkAPI.getState() as any).applications
      .exceptedNotification?.id;

    const { order, objects, query } = data;

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `order/`,
        method: "POST",
        body: { ...order, notification: notification ? notification : null },
      })
    );

    if (res.id) {
      const resOrder = await thunkAPI.dispatch(
        httpRequest({
          url: `application/`,
          method: "POST",
          body: { order: res.id, objects },
        })
      );

      if (!!resOrder?.[0] || resOrder.id) {
        thunkAPI.dispatch(
          openSnackbar({
            status: "success",
            message: i18next.t("settings.snackbar.created"),
          })
        );

        thunkAPI.dispatch(getApplications(query));
        if (
          (thunkAPI.getState() as any).settings?.profile?.role ===
          "account_manager"
        )
          thunkAPI.dispatch(getNotifications());
      }

      return res;
    }
  }
);

export const createApplicationWithClientThunk = createAsyncThunk(
  "applications/createApplicationWithClientThunk",
  async (data: { user: postDataType; appData: any; query: any }, thunkAPI) => {
    const { user, appData, query } = data;

    const notification = (thunkAPI.getState() as any).applications
      .exceptedNotification?.id;

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("telegram", user.telegram);
    formData.append("phone_number", user.phone_number);
    formData.append("image", user.image as File);
    formData.append("activity", String(user.activity!.id));

    const resUser = await thunkAPI.dispatch(
      httpRequest({
        url: `client/contact/`,
        method: "POST",
        body: formData,
        haveImg: true,
      })
    );

    if (resUser.id) {
      const { order, objects } = appData;

      const res = await thunkAPI.dispatch(
        httpRequest({
          url: `order/`,
          method: "POST",
          body: {
            ...order,
            client: resUser.id,
            notification: notification ? notification : null,
          },
        })
      );

      if (res.id) {
        const resOrder = await thunkAPI.dispatch(
          httpRequest({
            url: `application/`,
            method: "POST",
            body: { order: res.id, objects },
          })
        );

        if (!!resOrder?.[0] || resOrder.id) {
          thunkAPI.dispatch(
            openSnackbar({
              status: "success",
              message: i18next.t("settings.snackbar.created"),
            })
          );

          thunkAPI.dispatch(getApplications(query));
          if (
            (thunkAPI.getState() as any).settings?.profile?.role ===
            "account_manager"
          )
            thunkAPI.dispatch(getNotifications());
        }

        return res;
      }
    }
  }
);

export const editApplicationThunk = createAsyncThunk(
  "applications/editApplicationThunk",
  async (data: any, thunkAPI) => {
    const { orderId, objects, query } = data;

    const resOrder = await thunkAPI.dispatch(
      httpRequest({
        url: `application/`,
        method: "POST",
        body: { order: orderId, objects },
      })
    );

    if (!!resOrder?.[0] || resOrder?.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.edited"),
        })
      );

      thunkAPI.dispatch(getApplications(query));
    }

    return resOrder;
  }
);

export const editApplicationObject = createAsyncThunk(
  "applications/editApplicationObject",
  async (obj: any, thunkAPI) => {
    const { data, query, id } = obj;

    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `application/${id}/`,
        method: "PATCH",
        body: data,
      })
    );

    if (res.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.edited"),
        })
      );

      thunkAPI.dispatch(getApplications(query));
    }

    return { status: "success" };
  }
);

export const deleteApplicationObject = createAsyncThunk(
  "applications/deleteApplicationObject",
  async (obj: any, thunkAPI) => {
    const { id, query } = obj;
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `application/${id}/`,
        method: "DELETE",
        noJson: true,
      })
    );

    if (res.status === 200 || res.status === 204) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("settings.snackbar.deleted"),
        })
      );

      thunkAPI.dispatch(getApplications(query));
    }

    return { status: "success" };
  }
);

export const deleteApplicationThunk = createAsyncThunk(
  "applications/deleteApplicationThunk",
  async (_, thunkAPI) => {
    const ids = (thunkAPI.getState() as any).applications.selectedItems;
    const res = await thunkAPI.dispatch(
      ids.length > 1
        ? httpRequest({
            url: `application/delete_applications/`,
            method: "DELETE",
            body: { ids },
            noJson: true,
          })
        : httpRequest({
            url: `order/${ids[0]}/`,
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

export const postOrderApplicationThunk = createAsyncThunk(
  "applications/postOrderApplicationThunk",
  async (id: number, thunkAPI) => {
    try {
      const res = await thunkAPI.dispatch(
        httpRequest({
          url: `order/`,
          method: "POST",
          body: { application: id },
        })
      );

      if (res.id) {
        thunkAPI.dispatch(
          openSnackbar({
            status: "success",
            message: i18next.t("settings.snackbar.created"),
          })
        );

        return { status: "success" };
      }
    } catch (error) {
      return { status: "failed" };
    }
  }
);

export const postOrderApplicationStepThunk = createAsyncThunk(
  "applications/postOrderApplicationStepThunk",
  async (data: any, thunkAPI) => {
    try {
      const res = await thunkAPI.dispatch(
        httpRequest({
          url: `step/`,
          method: "POST",
          body: data,
        })
      );

      if (res.id) {
        thunkAPI.dispatch(
          openSnackbar({
            status: "success",
            message: i18next.t("settings.snackbar.created"),
          })
        );

        return { status: "success" };
      }
    } catch (error) {
      return { status: "failed" };
    }
  }
);

export const cancelNotificationThunk = createAsyncThunk(
  "applications/cancelNotificationThunk",
  async (arg: { id: number; data: any }, thunkAPI) => {
    const { id, data } = arg;
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `notification/${id}/`,
        method: "PATCH",
        body: data,
      })
    );

    if (res.id) {
      thunkAPI.dispatch(
        openSnackbar({
          status: "success",
          message: i18next.t("applications.cancelNotification"),
        })
      );

      return res;
    }
  }
);
