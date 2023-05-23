import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "../../utils/request";

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async (_, thunkAPI) =>
    await thunkAPI.dispatch(
      httpRequest({
        url: `analytics/pie/chart/`,
      })
    )
);

export const getStatisticsTypes = createAsyncThunk(
  "statistics/getStatisticsTypes",
  async (_, thunkAPI) =>
    await thunkAPI.dispatch(httpRequest({ url: `analytics/job/work/` }))
);

export const downloadStatistics = createAsyncThunk(
  "statistics/downloadStatistics",
  async (_, thunkAPI) => {
    const fileRes = await thunkAPI.dispatch(
      httpRequest({ url: `analytics/excel/`, noJson: true })
    );
    const blob = await fileRes.blob();

    const blobURL = window.URL.createObjectURL(new Blob([blob]));
    const file = document.createElement("a");
    file.href = blobURL;
    file.setAttribute("download", "document.xlsx");
    document.body.appendChild(file);
    file.click();
    file.remove();
  }
);

export const downloadPaymentStatistics = createAsyncThunk(
  "statistics/downloadPaymentStatistics",
  async (_, thunkAPI) => {
    const fileRes = await thunkAPI.dispatch(
      httpRequest({ url: `analytics/payment/`, noJson: true })
    );
    const blob = await fileRes.blob();

    const blobURL = window.URL.createObjectURL(new Blob([blob]));
    const file = document.createElement("a");
    file.href = blobURL;
    file.setAttribute("download", "document.xlsx");
    document.body.appendChild(file);
    file.click();
    file.remove();
  }
);

export const downloadStatisticsByFilter = createAsyncThunk(
  "statistics/downloadStatisticsByFilter",
  async ({ query, url }: { query: any; url: string }, thunkAPI) => {
    const manager =
      query.get("manager") === "99999" ? null : query.get("manager");
    const date_from = query.get("date_from");
    const date_to = query.get("date_to");
    const work =
      url === "analytics/successful/failed/project/excel/"
        ? query.get("work")
        : null;

    const fileRes = await thunkAPI.dispatch(
      httpRequest({
        url: `${url}?${manager ? `&manager=${manager}` : ``}${
          date_from ? `&date_from=${date_from}` : ``
        }${date_to ? `&date_to=${date_to}` : ``}${work ? `&work=${work}` : ``}`,
        noJson: true,
      })
    );
    const blob = await fileRes.blob();

    const blobURL = window.URL.createObjectURL(new Blob([blob]));
    const file = document.createElement("a");
    file.href = blobURL;
    file.setAttribute("download", "Document.xlsx");
    document.body.appendChild(file);
    file.click();
    file.remove();
  }
);
