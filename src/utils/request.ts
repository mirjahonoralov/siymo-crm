// import { openSnackbar } from "../store/slices/mainSlice";
import { openSnackbar } from "../store/slices/mainSlice";
import { refreshToken } from "./refreshToken";
const { REACT_APP_BASE_URL: baseURL } = process.env;

// const data = await thunkAPI.dispatch(httpRequest({})); example to use

type T = {
  url: string;
  method?: string;
  body?: object;
  token?: boolean;
  noJson?: boolean;
  isLogin?: boolean;
  haveImg?: boolean;
};

export const httpRequest = ({
  url,
  method,
  body,
  token = true,
  noJson,
  isLogin,
  haveImg,
}: T) => {
  return async (dispatch: any) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("siymoToken")}`,
      "Content-Type": "application/json",
    };

    try {
      const res = await fetch(`${baseURL}/${url}`, {
        method: method || "GET",
        headers: haveImg
          ? {
              Authorization: `Bearer ${localStorage.getItem("siymoToken")}`,
            }
          : token
          ? headers
          : {
              "Content-Type": "application/json",
            },
        body: (haveImg ? body : JSON.stringify(body))! as BodyInit | string,
      });
      if (res.status === 500) {
        dispatch(openSnackbar({ status: "error", message: "Server Error" }));
      }
      if (res.status === 401 && !isLogin) refreshToken();
      if (res.status === 400)
        dispatch(openSnackbar({ status: "error", message: "Error" }));
      if (noJson) return res;
      else return await res.json();
    } catch (error) {
      dispatch(openSnackbar({ status: "error", message: "Error" }));
    }
  };
};
