const { REACT_APP_BASE_URL: baseURL } = process.env;

export const refreshToken = async () => {
  if (localStorage.getItem("siymoRefreshToken")) {
    const res = await fetch(`${baseURL}/api/login/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("siymoRefreshToken"),
      }),
    });

    const resData = await res.json();

    if (res.status === 401) {
      localStorage.removeItem("siymoToken");
      localStorage.removeItem("siymoRefreshToken");
    } else {
      localStorage.setItem("siymoToken", resData.access);
      // window.location.reload();
      //   window.location.reload(false);
    }
  } else {
    // localStorage.removeItem("siymoToken");
    // localStorage.removeItem("siymoRefreshToken");
  }
};
